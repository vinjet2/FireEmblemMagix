<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div>
    <form action="index.php" method="POST">
        <div class="formSeparator"></div>
            <div class="formLabel"><label for="username">Nom d'usager : </label></div>
            <div class="formInput"><input type="text" name="username" id="username"></div>

            <div class="formSeparator"></div>
            <div class="formLabel"><label for="password">Mot de passe : </label></div>
            <div class="formInput"><input type="password" name="password" id="password"></div>

            <div class="formSeparator"></div>
            <div class="formInput"><button type="submit">Connexion</button></div>
    </form>
</div>
<?php
    require_once("partial/footer.php");
