<?php
phpinfo();
echo json_encode([
    "session_loaded" => extension_loaded("session"),
    "available_extensions" => get_loaded_extensions()
]);
?>
