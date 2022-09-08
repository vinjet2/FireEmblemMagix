<?php
    require_once("action/indexAction.php");

    $action = new indexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<?php
    require_once("partial/footer.php");
