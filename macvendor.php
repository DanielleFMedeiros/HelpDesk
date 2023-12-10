<?php
$mac_address = isset($_GET['mac']) ? $_GET['mac'] : '';

if (!empty($mac_address)) {
    $url = "https://api.macvendors.com/" . urlencode($mac_address);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);

    if ($response) {
        echo $response;
    } else {
        echo "Not Found";
    }

    curl_close($ch);
} else {
    echo "Endereço MAC não fornecido.";
}
?>
