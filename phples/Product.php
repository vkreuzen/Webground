<?php

class Product{
    private $price;
    private $name;
    private $ean;
    private $description;
    private $category;
    private $offerPrice;


    function __construct($name,$price,$ean,$description,$categeory,$offerPrice){
        $this->name = $name;
        $this->price = $price;
        $this->ean = $ean;
        $this->description = $description;
        $this->category = $categeory;
        $this->offerPrice = $offerPrice;
    }

    function getPrice(){
        return $this->price;
    }

    function getName(){
        return $this->name;
    }

    function getHTMLcode(){
        return '<tr>
                    <td class="product">'.($this->name).'</td>
                    <td class="price">&euro; '.($this->price).'</td>
                    <td class="ean">'.($this->ean).'</td>
                    <td class="description">'.($this->description).'</td>
                    <td class="category">'.($this->category).'</td>
                    <td class="offerPrice">'.(($this->offerPrice > 0) ? '&euro; '.($this->offerPrice) : '').'</td>
                </tr>';
    }

}

?>