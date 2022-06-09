<?php include "head.php";?>
<body>
    <div class="jumbotron">
        <h1 class="display-3">Golumb Music</h1>
        <p class="lead">A mathematical way to generate pattern free music</p>
    </div>
    <!-- React file is inserted here to generate golumb grid -->
    <div id="golumn-grid"></div>
</body>
<script src="../src/Grid/Square.js" type = "text/babel"></script>
<script src="../src/Grid/Grid.js" type = "text/babel"></script>
<script src="../src/Grid/InputButton.js" type = "text/babel"></script>
<script src="../src/Grid/PlayButton.js" type = "text/babel"></script>
<script src="../src/GridIndex.js" type = "text/babel"></script>
<?php include "foot.php";?>