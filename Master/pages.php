<?php
	function applicationHome() {
		$html = '
			<center>
				Home
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
	}

    function application() {
        $html = '
			<center>
		        Well this is awkward
	        </center>
	    ';
	    $arr = array('html' => $html, 'status' => 0);
        echo json_encode($arr);
    }
    
    function settings() {
    	$html = '
			<center>
				Settings!
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
    }
    
    function about() {
    	$html = '
			<center>
				ABOUT!
			</center>
		';
		$arr = array('html' => $html, 'status' => 0);
		echo json_encode($arr);
    }
?>