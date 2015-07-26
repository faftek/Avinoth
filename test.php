<?php
   
    	$html = '<!--logged in -->
			<center>
		        <form>
			        Please Input your ticket number: <br>
		        	<input type="text" id="TicketNumber"> <br>
			        <input type="button" value="Submit" onClick="checkNum()">
	        	</form>
	        </center>
	    ';
        $arr = array('html' => $html, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
        json_encode($arr);
        echo json_encode($arr);
    
?>