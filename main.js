

$(document).ready(()=> {
    $('#submit').on('click',(e) => {
        console.log('clicked')        
    },(e) => {
        // Prevent default form submission
        e.preventDefault();
        email = $('#email').val()
        username = $('#username').val()
        FormData = {
            'email': email,
            'username': username
        }

        $.ajax({
            type: 'POST',
            timeout: '10000',
            data: FormData,
            url: '/users',
            success: (res)=>{
                $('#username').val('');
                $('#email').val('');
            
                $.ajax({
                    type: 'GET',
                    timeout: '10000',
                    datatype: 'xml',
                    url: '/users',
                    success: (res) => {
                    // Convert response to XML
                    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
                    
                    for (const [key,val] of Object.entries(FormData)){
                        xml += `<item>\n<${key}>${val}</${key}>\n</item>\n`
                    }
                    xml += '</data>';
                    // Display XML
                    $('#data').text(xml);},
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                })
            },
            error: (xhr,status, error) => console.log('error : ',error),
            done: (xhr,status, error)=> console.log('Done Ajax Post')
        })

        
    })
})

