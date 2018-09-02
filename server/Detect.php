<?php

define('BOTH', 'BOTH');
define('RELATION_HORIZONTAL', 'RELATION_HORIZONTAL');
define('ENTITY_VERTICAL', 'ENTITY_VERTICAL');

define('ENTITY', 'ENTITY');
define('RELATION', 'RELATION');
define('HORIZONTAL', 'HORIZONTAL');
define('VERTICAL', 'VERTICAL');

class Detect {
    public $allData = [];
    public $filterData = [];

    public function __construct($keyWords=['ebay'], $fields=['url'], $operator = 'OR')
    {
        $this->readFile();
    }

    private function readFile() {
        $handle = false;
        try {
            $handle = fopen('./sample.json', 'r');
        } catch (Exception $e) {
            echo 'Error in opening file : ' . $e->getMessage() . PHP_EOL;
        }

        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $arrayData = json_decode($line, true);
                $this->allData[] = $arrayData;
            }
        }
        return true;
    }

    private function filterData($keyWords=['ebay'], $fields=['url'], $operator = 'OR') {
        $this->filterData = [];
        foreach ($this->allData as $arrayData) {
            // make preg match string from keywords with OR
            $preg = '(' . implode('|', $keyWords) . ')';
            // Do we search for keywords in first field OR second field ?
            if ($operator === 'OR') {
                foreach ($fields as $field) {
                    if (preg_match($preg, $arrayData[$field]) === 1) {
                        $this->filterData[$arrayData['url']][] = $arrayData;
                        continue;
                    }
                }
            }

            // Do we search for keywords in first field AND second field ?
            if ($operator === 'AND') {
                $found = true;
                foreach ($fields as $field) {
                    if (preg_match($preg, $arrayData[$field]) === 1) {
                        $found = $found && true;
                    } else {
                        $found = false;
                    }
                }
                if ($found) {
                    $this->filterData[$arrayData['url']][] = $arrayData;
                }
            }
        }
        return $this->filterData;
    }


    function jsonForRelationHorizontal($dataArray) {
        // Transpose the matrix array
        $countColumns = count($dataArray);
        $countRows = count($dataArray[0]);
        $newArray = [];
        for($row = 0; $row < $countRows; $row++) {
            $columnArray = [];
            for ($column = 0; $column < $countColumns; $column++) {
                $columnArray[] = $dataArray[$column][$row];
            }
            $newArray[$row] = $columnArray;
        }

        // combine header with data for json representation
        $header = $newArray[0];
        $data = array_slice($newArray, 1);
        $newData = [];
        foreach ($data as $datum) {
            $newData[] = array_combine($header, $datum);
        }
        return ($newData);
    }

    function jsonForEntityVertical($relationArray) {
        // first array is the header
        $header = $relationArray[0];
        $newData = [];
        $remainingRelationArray = array_slice($relationArray, 1);
        // combine header with data for json representation
        foreach ($remainingRelationArray as $datum) {
            $newData[] = array_combine($header, $datum );
        }
        return ($newData);
    }

    public function search($keyWords=['ebay'], $fields=['url'], $operator = 'OR', $type = BOTH) {
        $this->filterData($keyWords, $fields, $operator);
        $urlData = [];

        if($type === ENTITY_VERTICAL || $type === BOTH) {
            foreach ($this->filterData as $url => $data) {
                foreach ($data as $datum) {
                    if ($datum['tableType'] === ENTITY && $datum['tableOrientation'] === VERTICAL) {
                        $json = $this->jsonForEntityVertical($datum['relation']);
                        $urlData[$url][] = [
                            'url' => $url,
                            'title' => $datum['pageTitle'],
                            'attributes' => $json
                        ];
                    }
                }
            }
        }

        if($type === RELATION_HORIZONTAL || $type === BOTH ) {
            foreach ($this->filterData as $url => $data) {
                foreach ($data as $datum) {
                    if ($datum['tableType'] === RELATION && $datum['tableOrientation'] === HORIZONTAL) {
                        $json = $this->jsonForRelationHorizontal($datum['relation']);
                        $urlData[$url][] = [
                            'url' => $url,
                            'title' => $datum['pageTitle'],
                            'attributes' => $json
                        ];
                    }
                }
            }
        }

        return $urlData;
    }
}


