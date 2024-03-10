<?php
$mac_address = $_GET['mac_address'];

$url = "https://api.macvendors.com/" . urlencode($mac_address);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if ($response) {
    echo $response;
} else {
    echo "Not Found";
}

curl_close($ch);
?>
