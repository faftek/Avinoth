<html>
    <body>
        <script src = "js/jquery-2.1.4.js"></script>
        <script>
             $.post("test.php", function(result){
                document.write(JSON.parse(result).html);
    });

        </script>
    </body>
</html>

