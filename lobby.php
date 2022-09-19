<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div class="lobby">
	<div class="clavardage">
		<!-- <iframe style="width:700px;height:562px;" 
        	src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>/large">
		</iframe> -->

		<iframe style="width:700px;height:240px;" onload="applyStyles(this)"
			src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
		</iframe>
	</div>
	<div class="menu">
		<div class="button-banner">
			<a class="button-text" href="board.php?partie=PVP">Jouer</a>
		</div>
		<div class="button-banner">
			<a class="button-text" href="board.php?partie=TRAINING">Pratique</a>
		</div>
		<div class="button-banner">
			<a class="button-text" href="deck.php">Deck</a>
		</div>
		<div class="button-banner">
			<a class="button-text" href="notes.php">Notes</a>
		</div>
		<div class="button-banner">
			<a class="button-text" href="http://localhost/FireEmblemCarte/?logout=true">Quitter</a>
		</div>
	</div>
</div>
<?php
    require_once("partial/footer.php");