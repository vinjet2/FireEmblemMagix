<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="javascript/Jeu/lobby.js"></script>
<div class="lobby">
	<div class="clavardage">
		<!-- <iframe style="width:700px;height:562px;" 
        	src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>/large">
		</iframe> -->

		<iframe id="chat" style="width:700px;height:240px;" onload="applyStyles(this)"
			src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
		</iframe>
	</div>
	<div class="deck">
		<iframe id="deck" style="width:100vh;height:100vh;display:none" src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
		</iframe>
	</div>
	<div class="menu">
		<?php
			if ($data["messageErreur"] != null){
				?>
				<p> <?= $data["messageErreur"] ?></p>
				<?php
			}
		?>
		<div class="button-banner">
			<a class="button-text" href="lobby.php?partie=PVP">Jouer</a>
		</div>
		<div class="space"></div>
		<div class="button-banner">
			<a class="button-text" href="lobby.php?partie=TRAINING">Pratique</a>
		</div>
		<div class="space"></div>
		<div class="button-banner">
			<a class="button-text" href="javascript:void(0)" onclick="showDeck()">Deck</a>
			<script>
				let activate = false;
				function showDeck() {
					activate = !activate
					console.log("showDeck");
					if (!activate){
						document.getElementById("deck").style.display="none";
					}
					else {
						document.getElementById("deck").style.display="block";
					}
				}
			</script>
		</div>
		<div class="space"></div>
		<div class="button-banner">
			<a class="button-text" href="javascript:void(0)">Stats</a>
		</div>
		<div class="space"></div>
		<div class="button-banner">
			<a class="button-text" href="lobby.php?logout=true">Quitter</a>
		</div>
	</div>
</div>
<?php
    require_once("partial/footer.php");