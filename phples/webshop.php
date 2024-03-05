<?php

require_once('Product.php');

require_once('dbConnect.php');

require_once('db.php');

$result = [];

if (isset($_POST)) {
    if (
        array_key_exists('name', $_POST) && array_key_exists('email', $_POST)
        && array_key_exists('message', $_POST)  && array_key_exists('type-message', $_POST)
    ) {
        $result['name'] = $_POST['name'];
        $result['email'] = $_POST['email'];
        $result['message'] = $_POST['message'];
        $result['type'] = $_POST['type-message'];
    }
}

submitContactToDB($conn,$result);


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php

    $products = [];

    $result = $conn->query('SELECT * FROM product');
    while ($row = $result->fetch_assoc()) {

        array_push($products, new Product($row['Name'], $row['Price'], $row['EAN'], $row['description'], $row['Category'], $row['offerPrice']));
    }

    echo '<table>
        <tr>
            <th>Productnaam</th>
            <th>Prijs</th>
            <th>EAN</th>
            <th>Beschrijving</th>
            <th>Type</th>
            <th>Aanbieding!</th>
        </tr>';

    foreach ($products as $product) {
        $div = $product->getHTMLcode();
        echo $div;
    }

    echo '</table>';

    ?>

    <?php

    require_once('contactform.html');

    ?>
</body>

</html>