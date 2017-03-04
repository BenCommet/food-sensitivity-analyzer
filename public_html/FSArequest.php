<html lang="en">

<head>
    <title>Food Sensitivity Analyzer DataBase Server</title>
    <!-- <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script> -->
</head>


<!--PHP Server Page for the Food Sensitivity Analyzer Database.
     FSA application will  post to this server .

     - Mitch Hickox, Feb 16th 2017
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
   /* echo "<h1>Error connecting to database.</h1>";
    echo "<p>Error : $e</p>";
    echo "<br>Username: $username";
    echo "<br>Password: $password";
    echo "<br>DSN: $dsn";
    echo "<br><br><br>";*/
}

// $requestType ill either be "query", "exec", "userLogin", "userSignUp"
/*
 * "query" will return the results of the query with fields separate by ":" and records separated by "*"
 * "exec" will perform  updates or deletes
 * ""insert" will return True or False depending on success
 * ""userLogin" will return true if login credentials hold up, otherwise false
 * "userSignUp" will return true if the user email does not already exist
 *
 * */
$requestType = $_GET['requestType'];

$query = $_GET['query'];
$exec = $_GET['exec'];


//DB Data
$userName        = $_GET['userName'];
$email           = $_GET['email'];
$password        = $_GET['password'] ;
$itemType        = $_GET['itemType'];
$itemName        = $_GET['itemName'];
$description     = $_GET['desc'];
//database entry names: userName, email, password, type, fisName, time, description




//Exec
if($requestType == "exec")
{

    try
    {
        $db->exec($exec);
        echo "T";
    }
    catch(Exception $e)
    {
        echo "F";
    }



}



//Query
try {

    if($requestType == "query")
    {

        $all = $db->query($query);
        $count = 0;
        while ($records = $all->fetchAll(PDO::FETCH_ASSOC)) {
            ;

            foreach($records as $record)
            {
                echo "<br><br>Row $count:<br>";
                foreach ($record as $field)
                {
                    echo "$field";
                    //Field separator
                    echo ":";
                }
                $count += 1;
            }

            //Record separator
            echo "*";
        }
    }

} catch (Exception $e) {
    /*echo "<h1>Error querying database.</h1>";
    echo "<p>Error : $e</p>";
    echo "<br><br><br>";*/
    echo "Error";
}

//insert
if($requestType == "insert")
{
    try{
        $db->exec("INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('$userName', '$email','$password', '$itemType', '$itemName', NOW(), '$description')");

        echo "T";
    }
    catch(Exception $e)
    {
        echo "F";
    }

}

//userSignUp
if($requestType == "userSignUp")
{
    try{

        //TODO enter select query
        $result = $db->query("SELECT COUNT(time) AS Exists FROM fsa WHERE email=$email;");
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
        $count = $data[0][0]; //TODO might need to change this line



        if($count > 0)
        {
            echo "F";
        }
        else
        {

            echo "T";
            //Insert new user
            $db->exec("INSERT INTO fsa
         (userName, email, password, type, fisName, time, description)
     VALUES
         ('$userName', '$email','$password', '', '', NOW(), '')");
        }

    }
    catch(Exception $e)
    {
        echo "Error";
    }




}


//userLogin
if($requestType == "userLogin")
{
    try{

        //TODO enter select query
        $result = $db->query("SELECT COUNT(time) AS Exists FROM fsa WHERE email=$email;");
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
        $countEmail = $data[0][0]; //TODO might need to change this line


        $result = $db->query("SELECT COUNT(time) AS Exists FROM fsa WHERE email=$email AND password=$password;");
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
        $countEmailAndPassword = $data[0][0]; //TODO might need to change this line

        if($countEmail > 0 && $countEmailAndPassword == 0)
        {
            echo "Incorrect Password.";
        }
        else if($countEmail == 0)
        {
            echo "No such user.";
        }
        else
        {
            echo "Success.";
        }

    }
    catch(Exception $e)
    {
        echo "Error";
    }


}








?>
</body>
</html>
