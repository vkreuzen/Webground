<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    $x = 400;

    echo $x - 200;

    require_once('test.html');

    class test {
        private int $x;
        public function test_x(){
            $x = 4;
            print $x;
        }
    }

    $test = new test;
    $test->test_x();

    ?>    
</body>
</html>