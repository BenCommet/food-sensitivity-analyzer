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


//DB Data
$userName        = $_GET['userName'];
$email           = $_GET['email'];
$password        = $_GET['password'] ;
$itemType        = $_GET['itemType'];
$itemName        = $_GET['itemName'];
$time            = $_GET['time'];
$description     = $_GET['desc'];

$newPassword     = $_GET['newPassword'];
//database entry names: userName, email, password, type, fisName, time, description

//echo $requestType;



//Delete
if($requestType == "delete")
{

    try
    {
        $db->exec("DELETE FROM fsa WHERE email='$email' AND fisName='$itemName' AND time='$time';");
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
              //TODO make sure data never contains *, +, or #
                //Record separator
                echo "*";
                foreach ($record as $field)
                {
                    echo "$field";
                    //Field separator
                    echo "+";
                }
                $count += 1;
            }
            //Data terminator
            echo "#";

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
         ('$userName', '$email','$password', '$itemType', '$itemName', '$time', '$description')");

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

        //check if this email is already in use
        $result = $db->query("SELECT * FROM fsa WHERE email='$email';");
        $count = $result->rowCount();



        //Email already taken
        if($count > 0)
        {
          //Is email available?
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


        //check if any users have this email
        $result = $db->query("SELECT * FROM fsa WHERE email='$email';");
        $countEmail = $result->rowCount();

        //check if this password goes with this email
        $result = $db->query("SELECT * FROM fsa WHERE email='$email' AND password='$password';");
        $countEmailAndPassword = $result->rowCount();


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



//resetPassword
if($requestType == "resetPassword")
{
    try{


        //check if any users have this email
        $result = $db->query("SELECT * FROM fsa WHERE email='$email';");
        $countEmail = $result->rowCount();

        //check if this password goes with this email
        $result = $db->query("SELECT * FROM fsa WHERE email='$email' AND password='$password';");
        $countEmailAndPassword = $result->rowCount();


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


            /*Change password*/
        $db->exec("UPDATE fsa  SET password='$newPassword' WHERE email='$email';");

            echo "Success.";
        }

    }
    catch(Exception $e)
    {
        echo "Error";
    }


}













?>
