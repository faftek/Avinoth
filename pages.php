<?php
	function applicationHome() {
		$html = '
			<center>
				Thank you for using the ABS Bench application. This section is currently in progress, and will be done at some point in the future. Please just select application for now!
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
	}

    function application() {
        $html = '
			<center>
		        <form>
			        Please Input your ticket number: <br>
		        	<input type="text" id="TicketNumber"> <br>
			        <input type="button" value="Submit" onClick="checkNum()">
	        	</form>
	        </center>
	    ';
	    $arr = array('html' => $html, 'status' => 0);
        echo json_encode($arr);
    }
    
    function settings() {
    	$html = '
			<center>
				Thank you for using the ABS Bench application. This section is currently in progress, and will be done at some point in the future. Please just select application for now!
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
    }
    
    function about() {
    	$html = '
			<center>
				Thank you for using the ABS Bench application. This section is currently in progress, and will be done at some point in the future. Please just select application for now!
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
    }
?>