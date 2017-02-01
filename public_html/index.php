<html lang="en">

<head>
    <title>Food Sensitivity Analyzer DataBase Server</title>
</head>


<!--PHP Server Page for the Food Sensitivity Analyzer Database.
     This test page is intended for testing of the database, the
     FSA application will only post to this server (i.e. all html on this
     page is for testing only and will not be used by the app).

     - Mitch Hickox, January 30th 2017
 -->


<!-- Some initial MySQL commands

 //Table create


     CREATE TABLE fsa (userName VARCHAR(30), email VARCHAR(30), password VARCHAR(30), type CHAR(1), fisName VARCHAR(30), time DATETIME, description VARCHAR(100));

 //Test Row

     INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('Test Name', 'Test@email','TestPassword', 'S', 'TestTypeName', NOW(), 'TEST Stomach Pain');
-->


<body>


<!-- Database Connection -->
<?php


try {
    $dsn = 'mysql:host=cis.gvsu.edu;dbname=hickoxm';
    $username = 'hickoxm';
    $password = 'password8989';
    $db = new PDO($dsn, $username, $password);
} catch (Exception $e) {
    echo "<h1>Error connecting to database.</h1>";
    echo "<p>Error : $e</p>";
    echo "<br>Username: $username";
    echo "<br>Password: $password";
    echo "<br>DSN: $dsn";
    echo "<br><br><br>";
}

?>

<!-- Start of HTML -->
<p>PHP Server Page for the Food Sensitivity Analyzer Database.
    This test page is intended for testing and debugging of the database and application, the
    FSA application will only post to this server (i.e. all html on this
    page is for testing only and will not be used by the app).</p>
<h2>Enter Database Item</h2>
<div>

    <form role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">

        <h4>Username:</h4>
        <input type="text" name="userName" placeholder="Squilliam Fancyson" required autofocus>
        <br>
        <h4>Email:</h4>
        <input type="email" name="email" placeholder="fancyson@hotmail.com">
        <br>
        <h4>Password:</h4>
        <input type="password" name="password" placeholder="password123">
        <br>
        <h4>Type of Entry (S, F, or I):</h4>
        <input type="text" name="itemType" placeholder="S">
        <br>
        <h4>Name of Symptom/Food/Ingredient</h4>
        <input type="text" name="itemName" placeholder="Stomach Ache">
        <br>
        <h4>Short Description:</h4>
        <input type="text" name="itemName" placeholder="Pain in stomach, woozines, etc.">
        <br>
        <br>
        <button type="submit" name="submit">Submit Item to Database</button>
    </form>
</div>
<br>
<br>
<br>
<h2>Enter query:</h2>


<form name="form" action="" method="get">
    <input type="text" name="query" placeholder="SELECT * FROM fsa;">
</form>

<?php
/*TODOchange to ajax request, PHP doesnt work on client side, duh!
 *
 * $query = $_GET['query'];
$result = $db->query($query);
echo "<br>Result: <br>";
print $result;*/
?>

</body>
</html>
