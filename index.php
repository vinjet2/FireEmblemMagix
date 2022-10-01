<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="javascript/TiledImage.js"></script>
<script src="javascript/sprite/Byleth.js"></script>
<script src="javascript/animation.js"></script>
<script src="javascript/javascript.js"></script>
<div class="index" id="Background">
    <div id="chibi_byleth"></div>
	<div class="title"><img src="images/UI/FireEmblemIcon.png" alt="FireEmblem"></div>
	<div class="text_info"><p>   Move with < and > arrow   Change from Male to Female with V arrow</p></div>
	<div class="formContainer">
        <form action="index.php" method="POST">
            <div class="formSeparator"></div>
            <div class="formLabel"><label for="username">Nom d'usager : </label></div>
            <div class="formInput"><input type="text" name="username" id="username"></div>

            <div class="formSeparator"></div>
            <div class="formLabel"><label for="password">Mot de passe : </label></div>
            <div class="formInput"><input type="password" name="password" id="password"></div>

            <div class="formSeparator"></div>
            <div class="formInput"><button type="submit" class="fontLabel">Connexion</button></div>
        </form>
    </div>
</div>
<?php
    require_once("partial/footer.php");
