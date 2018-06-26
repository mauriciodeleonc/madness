<?php
//Multiline error log class
// ersin g�ven� 2008 eguvenc@gmail.com
//For break use "\n" instead '\n'

class Log {
	//
	//const USER_ERROR_DIR = '/home/site/error_log/Site_User_errors.log';
	
	const GENERAL_ERROR_DIR = 'log/error.log';
	const GENERAL_CONNECTION_DIR = 'log/connection.log';
	const SYNC_DIR = 'log/sync.log';


	/*
	 General Errors...
	*/
	public function error($msg)
	{
		$myVar = str_replace("\\","/",dirname(dirname(__FILE__))) .self::GENERAL_ERROR_DIR ;
		$date = date('d.m.Y h:i:s');
		$message = $date.' '.$msg."\n";
		error_log($message, 3, $myVar);
	}

}

$log = new Log();
