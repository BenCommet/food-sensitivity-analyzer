<html lang="en">

<head>
    <title>Food Sensitivity Analyzer DataBase Server</title>
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>

    <script>
        $(document).ready(function () {


            document.getElementById('testExec').style.width="800px";

            document.getElementById('testQuery').style.width="800px";

        });
    </script>
</head>



<!-- Some initial MySQL commands

 //Table create


     CREATE TABLE fsa (userName VARCHAR(30), email VARCHAR(30), password VARCHAR(30), type CHAR(1), fisName VARCHAR(30), time DATETIME, description VARCHAR(100));

 //Test Row

     INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('TestName', 'Test@email','TestPassword', 'S', 'TestTypeName', NOW(), 'TESTStomachPain');
-->


<body>


<!-- Database Connection -->
<?php


try {
    $dsn = 'mysql:host=cis.gvsu.edu;dbname=hickoxm';
    $username = 'hickoxm';
    $password = 'password8989';
    $db = new PDO($dsn, $username, $password);



    echo "Last Refreshed: " . date("Y/m/d") . "      " . date("h:i:sa") . "<br>";
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
<p>PHP Testing Page for the Food Sensitivity Analyzer Database.
    This test page is intended for testing and debugging of the database and application (i.e. all html on this
    page is for testing only and will not be used by the app).
    The FSA application will post to the server at http://www.cis.gvsu.edu/~hickoxm/FSArequest.php</p>




<?php

echo "<br>=========================================================================================<br>";
echo "<h1>Array Values</h1><br>";
echo "\$_POST Values: <br><br>";
print_r($_POST);

echo "<br><br>\$_GET Values: <br><br>";
print_r($_GET);
echo "<br>=========================================================================================";
?>

<h2>Enter Database Item</h2>
<div>

    <form role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">

        <h4>Username:</h4>
        <input type="text" name="t_userName" placeholder="Squilliam Fancyson" required autofocus>
        <br>
        <h4>Email:</h4>
        <input type="email" name="t_email" placeholder="fancyson@hotmail.com">
        <br>
        <h4>Password:</h4>
        <input type="password" name="t_password" placeholder="password123">
        <br>
        <h4>Type of Entry (S, F, or I):</h4>
        <input type="text" name="t_itemType" placeholder="S">
        <br>
        <h4>Name of Symptom/Food/Ingredient</h4>
        <input type="text" name="t_itemName" placeholder="Stomach Ache">
        <br>
        <h4>Short Description:</h4>
        <input type="text" name="t_desc" placeholder="Pain in stomach, woozines, etc.">
        <br>
        <br>
        <button type="submit" name="submit">Submit Item to Database</button>
    </form>
</div>

<?php


$t_uName      = $_POST['t_userName'];
$t_email      = $_POST['t_email'];
$t_passwd     = $_POST['t_password'] ;
$t_type       = $_POST['t_itemType'];
$t_fisName    = $_POST['t_itemName'];
$t_desc       = $_POST['t_desc'];

//echo "\$_POST Values: <br><br>";
//print_r($_POST);

//database entry names: userName, email, password, type, fisName, time, description

if($_POST['t_userName'] != "")
{


    $db->exec("INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('$t_uName', '$t_email','$t_passwd', '$t_type', '$t_fisName', NOW(), '$t_desc')");

    echo "Data Submitted!";
}


?>







<br>
<br>
<br>
<p>=========================================================================================</p>
<h2>Enter query:</h2>


<form role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
    <input type="text" name="testQuery" id="testQuery" placeholder="SELECT * FROM fsa;">

    <button type="submit" name="submitQuery">Execute Query</button>
</form>

<?php
try {
    /*$db->exec("INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('TestName', 'Test@email','TestPassword', 'S', 'TestTypeName', NOW(), 'TESTStomachPain')");*/
    /*
    $stmt = $db->prepare("INSERT INTO fsa  VALUES ( :userName, :email, :password, :type, :fisName, :time, :desc)");

    $uName = "TESTusername";
    $email ="TESTemail";
    $passwd ="TESTpassword";
    $type = "S";
    $fisName = "Headache";
    $time = "NOW()";
    $desc ="TEST head hurts=(";


    $stmt->bindParam(' :userName', $uName);
    $stmt->bindParam(' :email',$email);
    $stmt->bindParam(' :password',$passwd);
    $stmt->bindParam(' :type',$type);
    $stmt->bindParam(' :fisName',$fisName);
    $stmt->bindParam(' :time',$time);
    $stmt->bindParam(' :desc',$desc);

    $stmt->execute();
    */

    if($_POST['testQuery'] != "")
    {
        echo "<h3>Results</h3>";
        $all = $db->query($_POST['testQuery']);
        $count = 0;
        while ($records = $all->fetchAll(PDO::FETCH_ASSOC)) {
            ;

            foreach($records as $record)
            {
                echo "<br><br>Row $count:<br>";
                foreach ($record as $field)
                {
                    echo "$field";
                    echo "||||";
                }
                $count += 1;
            }
            //print_r($record);

            echo "<br>";
        }
    }

} catch (Exception $e) {
    echo "<h1>Error querying database.</h1>";
    echo "<p>Error : $e</p>";
    echo "<br><br><br>";
}

?>
<br>
<p>=========================================================================================</p>
<h2>Enter Deletion/Update:</h2>


<form role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
    <input type="text"  id="testExec" name="testExec" placeholder="DELETE FROM fsa WHERE userName='name';">


    <button type="submit" name="submitExec">Execute Deletion/Update</button>
</form>

<?php
try {
    $db->exec($_POST['testExec']);

} catch (Exception $e) {
    echo "<h1>Error executing deletion/update.</h1>";
    echo "<p>Error : $e</p>";
    echo "<br><br><br>";
}

?>

<br>
<p>=========================================================================================</p>





</body>
</html>
