<?php
	error_reporting(0);

	$type = !is_null($_GET) ? $_GET['t'] : [];
	$data = json_decode(file_get_contents('php://input'));

	switch ($type) {
		case 'ak':
			$command = 'ADD KI: IMSI="' . $data->imsi . '", KI="' . strtoupper($data->ki) . '", CARDTYPE="' . strtoupper($data->cardtype) . '";';

			if ($data->cardtype == "SIM" || $data->cardtype == "sim") {
				$command = rtrim($command, ';');
				$command .= ', ALG="COMP_3";';
			} elseif ($data->cardtype == "U-SIM" || $data->cardtype == "u-sim") {
				$command = rtrim($command, ';');
				$command .= ', ALG="MILANG", OPVALUE=2, AFG=5;';
			}

			sendCommand($command);
			break;

		case 'lk':
			// Do stuff
			break;
		
		default:
			# code...
			break;
	}

	function sendCommand($command)
	{
		$user_name = 'billingit';
		$password = 'qazokm2013hss';
		
		$host = "172.18.80.32";

		try {
			$fp=fsockopen($host,7777);
		} catch (Exception $e) {
			echo json_encode(['status' => 503, 'status-text' => 'Service Unavailable', 'response' => 'Unable to connect HLR!']); return;
		}

		fputs($fp,'LGI:OPNAME="'.$user_name.'", PWD = "'.$password.'";');
		sleep(1);
		
		$output='';
		$output.=fread($fp, 5000);    // read line by line, or at least small chunks
		$stat=socket_get_status($fp);
		
		if (strstr($output, "Operation is successful")){
			
			fputs($fp,$command);
			sleep(1);
			$output='';
			while (!feof($fp)) {
				$output .= fread($fp, 5000);
				$stream_meta_data = stream_get_meta_data($fp); //Added line
				if($stream_meta_data['unread_bytes'] <= 0) break; //Added line
			}
				//echo $output;
			if (strstr($output, "Operation is successful")){
				echo json_encode(['status' => 200, 'status-text' => 'OK', 'response' => $output]); return;
			}elseif (strstr($output, "ERR3007:Record not defined") || strstr($output, "ERR3001:Subscriber not defined")){
				echo json_encode(['status' => 422, 'status-text' => 'Unprocessable Entity', 'response' => 'User number does not exist']); return;
			}elseif (strstr($output, "ERR1006:No rights to execute this command")){
				echo json_encode(['status' => 403, 'status-text' => 'Forbidden', 'response' => 'HLR: No rights to execute this command']); return;
			}else{
				echo json_encode(['status' => 417, 'status-text' => 'Expectation Failed', 'response' => false]); return;
			}
			//return ("Operation succeeded ".$user_name." logged in successfully </br>");
		}else{
			echo json_encode(['status' => 401, 'status-text' => 'Unauthorized', 'response' => "Invalid user name"]); return;
			//return ("Invalid user name or password.Login failed ! </br>");
		}

		fclose($fp);
	}