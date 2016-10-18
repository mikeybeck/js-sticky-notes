$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */

	var tmp;
	
	$('.note').each(function(){
		 
		$("a.trash").click(function ( event ) {
		 
			event.preventDefault();

			var noteID = $(this).attr('href')

			$.get('ajax/delete_note.php',{
				  id	:	noteID
			});

			$(this).parent().animate({
				opacity: 0,
				left: '-=200',
				height: 'toggle', width: 'toggle'
			}, 300, function() {
				// Animation complete.
			});

		});
		
		/* Finding the biggest z-index value of the notes */

		tmp = $(this).css('z-index');
		if(tmp>zIndex) zIndex = tmp;
	});

	/* A helper function for converting a set of elements to draggables: */
	make_draggable($('.note'));
	
	/* Configuring the fancybox plugin for the "Add a note" button: */
	$("#addButton").fancybox({
        afterShow: function() {
                
            $('.color').click(function () {
                $('.fancybox-wrap .note').removeClass('yellow green blue').addClass($(this).attr('class').replace('color',''));
            });

            /* Listening for keyup events on fields of the "Add a note" form: */
            $('.pr-body,.pr-author').on('keyup',function(e){
			if(!this.preview)
				this.preview=$('.fancybox-wrap .note');
			
				/* Setting the text of the preview to the contents of the input field, and stripping all the HTML tags: */
				this.preview.find($(this).attr('class').replace('pr-','.')).html($(this).val().replace(/<[^>]+>/ig,''));
			});


				/* The submit button: */
			$('#note-submit').on('click',function(e){
				
				if($('.pr-body').val().length<4)
				{
					alert("The note text is too short!")
					return false;
				}
				
				if($('.pr-author').val().length<1)
				{
					alert("You haven't entered your name!")
					return false;
				}
				
				$(this).replaceWith('<img src="img/ajax_load.gif" style="margin:30px auto;display:block" />');
				
				var data = {
					'zindex'	: ++zIndex,
					'body'		: $('.pr-body').val(),
					'author'		: $('.pr-author').val(),
					'color'		: $.trim($('.fancybox-wrap .note').attr('class').replace('note',''))
				};
				
				
				/* Sending an AJAX POST request: */
				$.post('ajax/post.php',data,function(msg){
								 
					if(parseInt(msg))
					{
						/* msg contains the ID of the note, assigned by MySQL's auto increment: */
						
						var tmp = $('.fancybox-wrap .note').clone();
						
						tmp.find('span.data').text(msg).end().css({'z-index':zIndex,top:0,left:0});
						tmp.appendTo($('body'));
						
						make_draggable(tmp);
					}
					
					$.fancybox.close();

				});

				location.reload();
				
				e.preventDefault();
			});


			$('.note-form').on('submit',function(e) {
				location.reload(); 
				e.preventDefault();
			});

		}

	});	

});

var zIndex = 0;

function make_draggable(elements) {
	/* Elements is a jquery object: */
	
	elements.draggable({
		containment:'body',
		start:function(e,ui){ ui.helper.css('z-index',++zIndex); },
		stop:function(e,ui){
			
			/* Sending the z-index and positon of the note to update_position.php via AJAX GET: */

			$.get('ajax/update_position.php',{
				  x		: ui.position.left,
				  y		: ui.position.top,
				  z		: zIndex,
				  id	: parseInt(ui.helper.find('span.data').html())
			});
		}
	});
}