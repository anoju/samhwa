
/********************************
 * UI 스크립트 *
 * 작성자 : 안효주 *
 ********************************/
/* 콤마 함수 */
var addComma = function(num){
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
};
var removeComma = function(num){
	return num.toString().replace(/,/gi,"");
};
/* 숫자만 함수 */
var onlyNumber = function(num){
	return num.toString().replace(/[^0-9]/g,"");
};
/* 랜덤 숫자 구하기 */
var random = function(min,max){
	return ((Math.random() * (max-min)) + min).toFixed(2);
};

$(document).ready(function(){
	preLoading();
	deviceCheck();

	headerUI();
	footerUI();
	htmlInclude();
	commonUI();
	etcUI();
	popupUI();
	
	btnUI();
	toggleUI('.btn_toggle_01', false);
	toggleUI('.ui-toggle', false);
	toggleEtc();
	tabUI();
	tooltipUI();
	//btnTopUI();

	if($('.ui-height').length > 0)maxHeight('.ui-height');
	swiperInit();
	scrollItem();

	wordCount();
	priceTextChange();
		
	if($('.ui-split-text').length > 0)splitText('.ui-split-text');
	if($('.ui-typing-text').length > 0)typingTextInit();
	if($('.ui-roll-number').length > 0)rollingNumberInit();
	if($('.ui-countup').length > 0)countUpInit('.ui-countup');
	if($('.ui-countuplist').length > 0)countUpListInit('.ui-countuplist');
	
	$(window).load(function(){
		$(window).resize();
	});
});

var preLoading = function(){
	var isAppPreLoading = sessionStorage.getItem('isPreLoading'),
		$class = 'pre-loading',
		$imgarry = [
			// '/resource/img/wms/app/ico/ico_checkbox_disabled.png',
			// '/resource/img/wms/app/ico/ico_checkbox_off.png',
			// '/resource/img/wms/app/ico/ico_checkbox_on.png',
			// '/resource/img/wms/app/ico/ico_radio_disabled.png',
			// '/resource/img/wms/app/ico/ico_radio_off.png',
			// '/resource/img/wms/app/ico/ico_radio_on.png',
			// '/resource/img/wms/app/bg/bg-type-chart-01.png',
			// '/resource/img/wms/app/bg/bg-type-chart-02.png',
			// '/resource/img/wms/app/bg/bg-type-chart-03.png',
			// '/resource/img/wms/app/bg/bg-type-chart-04.png',
			// '/resource/img/wms/app/bg/bg-type-chart-05.png'
		];
		
	if(isAppPreLoading != 'true'){
		var $html = '<div class="'+$class+'">';
		for(var i in $imgarry){
			$html += '<span style="background-image:url('+$imgarry[i]+');"></span>';
		}
		$html += '</div>';
	
		sessionStorage.setItem('isPreLoading',true);
		$('body').append($html);
	}
};

var isMobile = {
	Android :function(){
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},

	BlackBerry :function(){
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},

	iOS :function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	iPhone :function(){
		return navigator.userAgent.match(/iPhone/i) == null ? false : true;
	},
	iPhoneVersion :function(){
		var $sliceStart = navigator.userAgent.indexOf("iPhone OS") + 10,
			$sliceEnd = $sliceStart + 2,
			$version = parseFloat(navigator.userAgent.slice($sliceStart,$sliceEnd));
		return $version;
	},

	Opera :function(){
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},

	Windows :function(){
		return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},

	any :function(){
		return ( isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
	},
	add :function(){
		if(isMobile.any()){
			if(isMobile.iOS())$('html').addClass('ios');
			if(isMobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
			if(isMobile.Android())$('html').addClass('android');
		}
	}
};

var isPC = {
	window :function(){
		return navigator.userAgent.match(/windows/i) == null ? false : true;
	},
	mac :function(){
		return navigator.userAgent.match(/macintosh/i) == null ? false : true;
	},

	chrome :function(){
		return navigator.userAgent.match(/chrome/i) == null ? false : true;
	},
	firefox :function(){
		return navigator.userAgent.match(/firefox/i) == null ? false : true;
	},
	opera :function(){
		return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;
	},
	safari :function(){
		return navigator.userAgent.match(/safari/i) == null ? false : true;
	},

	edge :function(){
		return navigator.userAgent.match(/edge/i) == null ? false : true;
	},
	msie :function(){
		return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;
	},
	ie11 :function(){
		return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
	},
	ie10 :function(){
		return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;
	},
	ie9 :function(){
		return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;
	},
	ie8 :function(){
		return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;
	},

	any :function(){
		return (isPC.window() || isPC.mac());
	},
	add :function(){
		//console.log(navigator.userAgent);
		if(isPC.any()){
			if(isPC.window())$('html').addClass('window');
			if(isPC.mac())$('html').addClass('mac');

			if(isPC.ie11())$('html').addClass('ie11');
			if(isPC.ie10())$('html').addClass('ie10');
			if(isPC.ie9())$('html').addClass('ie9');
			if(isPC.ie8())$('html').addClass('ie8');
			if(isPC.edge()){
				$('html').addClass('edge');
			}else if(isPC.opera()){
				$('html').addClass('opera');
			}else if(isPC.chrome()){
				$('html').addClass('chrome');
			}else if(isPC.safari()){
				$('html').addClass('safari');
			}else if(isPC.firefox()){
				$('html').addClass('firefox');
			}
		}
	}
};

var deviceCheck = function(){
	//OS 체크
	isMobile.add();
	isPC.add();

	//모바일 픽셀간 비율 체크
	if(isMobile.any()){
		var $pixelRatio = window.devicePixelRatio;
		if($pixelRatio != null)$('html').addClass('pixelRatio'+$pixelRatio);
	}

	//아이폰X 체크
	var $height = 736; 					//아이폰8플러스 높이값 736(보다 크면 아이폰X 시리즈로 처리)
	if(isMobile.iPhone()){				//아이폰인지 확인
		$(window).resize(function(){
			if($(window).innerWidth() < $(window).innerHeight()){
				//console.log('세로모드');
				if($(window).height() > $height)$('html').addClass('iPhoneX').removeClass('iPhoneX-horizon');
			}else{
				//console.log('가로모드');
				if($(window).width() > $height)$('html').addClass('iPhoneX-horizon').removeClass('iPhoneX');
			}
		});
	}
};

var clickType = (isMobile.iOS()) ? 'touchend' : 'click';

var headerUI = function(){
	var $header = $('#header'),
		$gnbTxt = $('#gnb a'),
		$pageTitle = $('#pageTit');									//gnb, lnb, title에 쓰일 텍스트지정
		
	if($pageTitle.length > 0){
		var $current = $.trim($pageTitle.text());
		document.title = $current + ' | 삼화페인 모바일';			//#pageTit 가 title태그에 삽입

		if($('#gnb').length){
			$gnbTxt.each(function() {
				if ( $(this).text() == $current) {
					$(this).parents('li').addClass('active');
				}
			});
		}
	}

	if($('#pageTop').hasClass('visual')){
		$header.addClass('type2');
	}

	//GNB UI
	$('.btn_gnb').click(function(e){
		e.preventDefault();
		if($('body').hasClass('gnb_open')){	
			$('body').removeClass('gnb_open');
		}else{	
			$('body').addClass('gnb_open');	
		}
	});
	$('.btn_gnb_open').on('click',function(e){
		e.preventDefault();
		$('body').addClass('gnb_open');
	});
	$('.btn_gnb_close').on('click',function(e){
		e.preventDefault();
		$('body').removeClass('gnb_open');
	});
	$('#gnb .in_sub').on('click', function(e){
		e.preventDefault();
		$(this).next('ul').stop().slideToggle();
		$(this).parent().toggleClass('on').siblings().removeClass('on').find('ul').slideUp();
	});

	//스크롤 시(리사이즈 시) 헤더 고정, visual 영
	if($header.length > 0){
		$(window).on('scroll resize',function(){
			var $scrollTop = $(this).scrollTop(),
				$contTop = $('#contents').offset().top;
			
			if($scrollTop > $contTop){
				$header.addClass('fixed');
			}else{
				$header.removeClass('fixed');
			}

			if($('#pageTop.visual').length > 0 && $header.hasClass('type2')){
				var $topStart = $('#pageTop').offset().top,
					$topEnd = $('#pageTop').outerHeight();
				$('#pageTop.visual .bg').css('top',($scrollTop/2));
				if($scrollTop > ($topStart + $topEnd)){
					$header.addClass('on');
				}else{
					$header.removeClass('on');
				}
			}
		});
	}
};

var footerUI = function(){
	//푸터 하단 고정을 위해 container에 min-height 값부여
	/*$(window).on('resize load',function(){
		var $winH = $(window).height(),
			$headerH = $('#header').outerHeight(),
			$footerH = $('#footer').outerHeight(),
			$container= $('#container');

		$container.removeAttr('style');
		var $containerH = $container.outerHeight(),
			$minHeight = $winH-$headerH-$footerH;

		if($minHeight > $containerH){
			$container.css('min-height',$minHeight); //#container의 height 보다 클때만 min-height 부여
		}
	});*/

	//btnTop
	$('#btnTop').on('click',function(e){
		e.preventDefault();
		$('html,body').animate({'scrollTop':0},500);
	});
};

var htmlInclude = function(){
	var $elements = $.find('*[data-include-html]');
	if($elements.length){
		$.each($elements, function() {
			var $this =  $(this),
				$html = $this.data('include-html'),
				$htmlAry = $html.split('/'),
				$htmlLast = $htmlAry[$htmlAry.length - 1];
			
			$this.load($html,function(res,sta,xhr){
				if(sta == "success"){
					console.log('Include '+$htmlLast+'!');
					$this.children().unwrap();
					if($htmlLast == 'header.html')headerUI();
					if($htmlLast == 'footer.html')footerUI();
				}
			});  
		});
	}
};

var $inpIdNum = 0;
var commonUI = function(){
	//label(.radio, .checkbox)
	/*$('.radio, .checkbox').each(function(){
		var $input = $(this).children('input'),
			$inputId = $input.attr('id'),
			$label = $(this).children('label'),
			$labelFor = $label.attr('for'),
			$inpId = 'ui-inp-',
			$inpIdTxt = $inpId+$inpIdNum;

		if($input.hasClass('small'))$(this).addClass('small');
		if($inputId == null || $inputId == ''){
			if($label.length){
				$inpIdNum += $inpIdNum;
				$input.attr('id',$inpIdTxt);
				$label.attr('for',$inpIdTxt);
			}
		}else if($labelFor == null || $labelFor == '' || $inputId != $labelFor){
			$label.attr('for',$inputId);
		}
	});*/

	//focus
	$(document).on('focusin','input, select, textarea',function(){
		$(this).addClass('focus');
	}).on('focusout','input, select, textarea',function(){
		$(this).removeClass('focus');
	});

	//input:file
	$(document).on('focus','.input_file .input',function(){
		$(this).closest('.input_file').find('.btn_file input').trigger('click');
	});
	$(document).on('click','.input_file .btn_file .button',function(e){
		e.preventDefault();
		$(this).closest('.btn_file').find('input').trigger('click');
	});
	$(document).on('change','.input_file .btn_file input',function(){
		$(this).closest('.input_file').find('.input').val($(this).val());
	});

	//input-del : input 입력 삭제버튼
	$('.input_del').each(function(){
		var $parent = $(this).parent();
		if(!$parent.hasClass('input_box'))$parent.addClass('input_box');
		if($(this).siblings('.btn_search').size() > 0)$parent.addClass('type2');
	});
	$(document).on('click','.input_del',function(e){
		e.preventDefault();
		var $input = $(this).siblings('input');
		$input.val('').focus();
		var $cntTxt = $('#'+$input.data('word-count'));
		if($cntTxt.length > 0)$cntTxt.text('0');
		if($(this).closest('.search_input').length)$(this).closest('.search_input').removeClass('on');
	});
	$('.search_input .input').keyup(function(){
        var $val = $(this).val();
        if($val != ''){
            $('.search_input').addClass('on');
        }else{
            $('.search_input').removeClass('on');
        }
	});
	$('.search_input .button').click(function(){
		$('.search_input').removeClass('on');
		$('.search_input .input').val('');
    });

	//ui-all-chk :  전체동의
	$(document).on('change','.ui-all-chk input',function(e){
		var $list = $(this).closest('.ui-all-chk'),
			$allChk = $list.find('.all-chk'),
			$chk = $list.find('input').not('.all-chk'),
			$length = $chk.length,
			$checked = $chk.filter(":checked").length;

		if($(this).hasClass('all-chk')){
			//전체동의 시 일반동의 체크
			if($allChk.prop('checked')){
				$chk.prop('checked', true);
			}else{
				$chk.prop('checked', false);
			}
		}else{
			//그냥 동의 시 전체동의 체크유무
			if( $length == $checked){
				$allChk.prop('checked', true);
			}else{
				$allChk.prop('checked', false);
			}
		}
	});

	// input 입력시 콤마입력
	$(document).on('focusin','input.ui-comma, input.ui-transNumber',function(){
		var $val = $(this).val();
		if($val == 0)$(this).val('');
	}).on('focusout','input.ui-comma, input.ui-transNumber',function(){
		var $val = $(this).val();
		if($val == '')$(this).val(0);
	});
	$(document).on('keyup','input.ui-comma',function(){
		var $val = removeComma(onlyNumber($(this).val()));
		$(this).val(addComma($val));
	});
	$(document).on('keyup','input.ui-transNumber',function(){
		var $text = $(this).data('text'),
			$val = removeComma(onlyNumber($(this).val()));
		$val = addComma($val);
		$(this).val($val);
		if($text != undefined)transNumber($text,$val);
	});
	// 숫자외 입력제한
	/*$(document).on('keyup','input[type=tel]',function(){
		var $val = onlyNumber($(this).val());
		if($(this).hasClass('ui-comma')) return;
		$(this).val($val);
	});*/
	
	//숫자키패드
	$('.ui-num-keypad button').click(function(e){
		e.preventDefault();
		var $input = $(this).closest('.ui-num-keypad').data('input'),
			$text = $(this).closest('.ui-num-keypad').data('text'),
			$max = $($input).attr('maxlength'),
			$val = removeComma($($input).val());
		if($val == '0')$val = '';
		
		if($(this).hasClass('reset')){
			$val = '0';
		}else if($(this).hasClass('del')){
			$val = addComma($val.substr(0,$val.length-1));
			if($val == '')$val = '0';
		}else{
			$val = addComma($val + $(this).text());
		}
		if($val.length > $max)return;
		if($input != undefined)$($input).val($val);
		if($text != undefined)transNumber($text,$val);
	});

	//tbl-wrap(tbl-guide)
	$('.tbl_wrap').each(function(){
		$(this).data('isFirst',true);
		$(this).on('scroll',function(){
			$(this).data('isFirst',false);
			$(this).find('.tbl_guide').remove();
		});
	});

	//resizeEnd 이벤트
	$(window).resizeEnd(function(){
		//tbl-guide 표시여부
		$('.tbl-wrap').each(function(){
			var $guide = '<div class="tbl-guide">← → 좌우 스크롤 하면<br>모두 확인가능합니다.</div>',
				$width = $(this).outerWidth(),
				$scrollW = $(this).get(0).scrollWidth;
			if($(this).data('isFirst')){
				if($width < $scrollW){
					if($(this).find('.tbl-guide').size() < 1)$(this).append($guide);
				}else{
					$(this).find('.tbl-guide').remove();
				}
			}
		});
	},200);

	//select_list
	$(document).on('click','.select_list > a',function(e) {
		e.preventDefault();
		var $parent = $(this).parent();
		if($parent.hasClass('on')){
			$parent.removeClass('on');
		}else{
			$('.select_list').removeClass('on');
			$(this).parent().addClass('on');
		}
	});
	$(document).on('click','.select_list .option',function(e) {
		if(!$(this).hasClass('link')){
			e.preventDefault();
			var $html = $(this).html();
			$(this).parent().addClass('selected').siblings().removeClass('selected');
			$(this).closest('.select_list').removeClass('on').children('a').html($html);
		}
	});

	//fake_select
	$(document).on('change','.fake_select select',function(e) {
		var $selected = $(this).find(':selected');
		$(this).siblings('span').text($selected.text());
	});

	spinnerInit();								//jQuery UI spinner + 마크업 spinner UI
	datepickerUI();								//jQuery UI 달력 + 달력
	selectMake();								//select 요소 마크업 생성
	selectMakeUI();								//select 요소 마크업 생성 후 클릭 UI
	radioSelectUI();
};

/* spinner UI 사용안함 */
var spinnerInit = function(){
	//spinner
	if($('.spinner').size() > 0){
		$( '.spinner' ).spinner({
			min: 1,
			create: function( event, ui ) {
				//add custom classes and icons
				$(this)
				.next().html('<i class="icon icon-plus">더하기</i>')
				.next().html('<i class="icon icon-minus">빼기</i>');
			}
		});
	}

	//inp_spinner
	if($('.inp_spinner').length > 0){
		$('.inp_spinner').each(function(){
			var $this = $(this),
				$min = $this.data('min'),
				$max = $this.data('max'),
				$input = $this.find('.input'),
				$inputVal = $input.val(),
				$btn = $this.find('.btn');

			$input.after('<select class="select" title="수량선택"><option value="0">직접입력</option></select>');
			var $select = $this.find('.select');

			//세팅
			for(var i = $min;i <= $max;i++){
				if(i == $inputVal){
					$select.append($('<option>',{value: i, text: i, selected: 'selected'}));
				}else{
					$select.append($('<option>',{value: i, text: i}));
				}
			}
			if($inputVal == '' ||$inputVal == null){
				$input.val($min);
				$select.val($min);
			}

			//셀렉트
			$select.change(function(){
				var $val = $(this).val();
				if($val == '0'){
					$select.addClass('hide');
					$input.addClass('on').attr("readonly",false).focus();
				}else{
					$input.val($val);
				}
			});

			//숫자 입력시
			$input.change(function(){
				var $val = $(this).val();
				if($min <= $val && $val <= $max){
					$select.val($val).removeClass('hide');
					$input.removeClass('on').attr("readonly",true);
				}else{
					alert($min+'에서 '+$max+'까지만 입력 가능합니다.\n다시 입력해주세요');
					$input.val($min);
					$select.val($min);
				}
			});
			var $firstVal = '';
			$input.focusin(function(){
				$firstVal = $(this).val();
			});
			$input.focusout(function(){
				var $lastVal = $(this).val();
				if($firstVal == $lastVal){
					//console.log($firstVal,$lastVal)
					$select.val($lastVal).removeClass('hide');
					$input.removeClass('on').attr("readonly",true);
				}
			});

			//버튼 클릭
			$btn.click(function(e){
				e.preventDefault();
				var $val = $input.val(),
					$val2 = $select.val();
				if($(this).hasClass('btn_minus')){
					$val--;
					if($val < $min){
						alert('최소수량은 '+$min+'개 입니다.');
						$val = $min;
					}
				}else{
					$val++;
					if($val > $max){
						alert('최대수량은 '+$max+'개 입니다.');
						$val = $max;
					}
				}
				$input.val($val);
				$select.val($val);
			});
		});
	}
};

/* 달력 UI */
var datepickerUI = function(){
	//datepicker
	if(isMobile.any()){									//모바일인지 확인
		//$( '.datepicker' ).attr('type','date');		//모바일 일때는 type을 date로 변경
		$( '.datepicker' ).parent().append('<input class="input_datepicker" type="date" title="날짜 선택">');  //모바일 일때는 input:date 추가로 기본 input UI 사용
		$('.input_datepicker').on('change',function(){
			var $val = $(this).val(),
				$newVal = $val.split('-').join('.');
			$(this).siblings('.datepicker').val($newVal);
		});
	}else if($('.datepicker').length > 0 ){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			yearSuffix: '.',
			showMonthAfterYear: true,
			showButtonPanel: true,
			showOn: 'both',
			//changeMonth: true,
			//changeYear: true,
			buttonText: '기간조회'
		});

		//리사이즈시 위치값 문제로 캘린더 닫기
		$(window).resize(function(){
			$('.ui-datepicker-close').trigger('click');
		});
	}
};

/* 셀렉트(ui-select) 만들기 */
var selectMake = function(){
	$("select.ui-select").each(function(){
		var classes = $(this).attr("class"),
			id      = $(this).attr("id"),
			name    = $(this).attr("name");
		if($(this).is(':visible')){
			var template  = '<div class="' + classes + '">';
				template += '<a href="#" class="ui-select-trigger">' + $(this).attr("placeholder") + '</a>';
				template += '<ul class="ui-select-options">';
				$(this).find("option").each(function(){
					template += '<li><a href="#" class="ui-select-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</a></li>';
				});
				template += '</ul></div>';

			$(this).wrap('<div class="ui-select-wrap"></div>');
			$(this).hide().after(template);
		}
	});
};
/* ui-select UI */
var selectMakeUI = function(){
	$(document).on("click",".ui-select-trigger", function(e){
		e.preventDefault();
		var $parent = $(this).closest(".ui-select");
		if($parent.hasClass('on')){
			$parent.removeClass('on');
		}else{
			$('.select_list').removeClass('on');
			$(this).parent().addClass('on');
		}
		// $(this).closest(".ui-select").toggleClass("on");
		// $('html').one('click',function(){
		// 	$(".ui-select").removeClass("on");
		// });
		// event.stopPropagation();
	});
	$(document).on("click",".ui-select-option", function(e){
	  e.preventDefault();
	  var $val= $(this).data("value"),
		  $select = $(this).closest(".ui-select-wrap").find("select");

	  $select.val($val);
	  $(this).parent().addClass("selected").siblings().removeClass("selected");
	  $(this).closest(".ui-select").removeClass("on").find(".ui-select-trigger").text($(this).text());
	});
};

/* radio_select */
var radioSelectUI = function(){
	//setting
	function btnChange(tar){ 
		var $this = $(tar),
			isClick = $this.data('active');

		if($this.find('input[type=radio]:checked').length == 0){
			$this.find('> ul').find('input[type=radio]').not(':disabled').first().prop('checked', true);
		}

		var $clon = $this.find('input[type=radio]:checked').siblings('.lbl').clone();

		$this.children('a, .lbl').remove();
		$this.prepend('<span class="lbl">'+ $clon.html() + '</span>');

		if(isClick != false && $this.find('input[type=radio]').not(':disabled').length != 1){
			$this.children('.lbl').wrap('<a href="#"></a>');
		}		
	}
	$('.radio_select').each(function(){
		btnChange(this);
	});

	//open
	$(document).on('click','.radio_select > a',function(e){
		e.preventDefault();
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
		}else{
			$('.radio_select').removeClass('on');
			$(this).parent().addClass('on').find('input:checked').focus();
		}
	});

	//selected
	$('.radio_select').on('change','input[type=radio]',function(){
		var $closest = $(this).closest('.radio_select');
		btnChange($closest);
	});	

	//close
	$('.radio_select').on('click','> ul .lbl',function(){ 
		var $this = $(this),
				$select = $this.closest('.radio_select');
		setTimeout(function(){
			$select.removeClass('on').children('a').focus();
		},1);
	});
	$('.radio_select').on('keydown','> ul input',function(e){
		var $this = $(this),
			$closest = $this.closest('.radio_select'),
			$keyCode = (e.keyCode ? e.keyCode : e.which);
		//console.log(e.keyCode);
		if($keyCode == 13 || $keyCode == 32 || $keyCode == 27){		// if(엔터 || 스페이스 || ESC){
			$this.siblings('.lbl').trigger('click');
		}
		if($keyCode == 9){		// 탭키(포커스 아웃시 닫기)
			$closest.removeClass('on');
		}
		if($keyCode == 37 || $keyCode == 38 || $keyCode == 39 || $keyCode == 40){	// 방향키(ie에서 방향키 이동 시 닫히는 현상때문에 추가)
			setTimeout(function(){
				$closest.addClass('on');
			},1);
		}
	});
	$(document).on('click',function(){
		$('.radio_select').removeClass('on');
	}).on('click','.radio_select',function(e) {
		e = e || window.event;
		if(typeof e.stopPropagation == "function"){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	});
};

var etcUI = function(){
	//ui-type-chart
	$(document).on('click','.ui-type-chart .link',function(e){
		e.preventDefault();
		if($(this).closest('li').hasClass('disabled')) return;
		var $idx = $(this).closest('li').index(),
			$chart = $(this).closest('.ui-type-chart');
		if($chart.hasClass('ui-type2')){
			//console.log('type2');
			$(this).closest('.ui-type-chart').find('.tip.sel').remove();
			if($(this).siblings('.tip').length > 0){
				$(this).after('<div class="tip sel">투자성향과<br>포트폴리오 일치</div>');
			}else{
				$(this).after('<div class="tip sel">선택하신<br>포트폴리오</div>');
			}
		}else{
			//console.log('type1');
			$('.txt-center-01 .tit').children().eq($idx).show().siblings().hide();
		}
		$(this).closest('li').addClass('active').siblings().removeClass('active');
		$('.type-chart-summary').children().eq($idx).show().siblings().hide();

		//웹 접근성 보완
		var $role = $(this).attr('role');
		if($role == 'tab'){
			var $tabpanel = $(this).attr('aria-controls');
			$(this).attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);
			$('#'+$tabpanel).attr('aria-expanded',true).siblings('[role=tabpanel]').attr('aria-expanded',false);
		}
	});
	/*$(window).load(function(){
		$('.ui-type-chart.ui-type2').find('li.active').find('.link').trigger('click');
	});*/

	//faq-list
	$('.btn_faq').click(function(e){
		e.preventDefault();
		var $li = $(this).closest('li');

		$li.siblings().removeClass('on').find('.faq-a').stop().slideUp();
		$li.toggleClass('on').find('.faq-a').stop().slideToggle();
		$li.closest('.tab-cont').siblings().find('.faq-list > li').removeClass('on').find('.faq-a').removeAttr('style');
	});

	//table 열 강조
	$('.table-col-hover').on('mouseover','.table-col-box',function(){
		var $td = $(this).parent(),
			$idx = $td.index();
		$(this).closest('table').find('tr').each(function(){
			$(this).children().eq($idx).addClass('col-on').siblings().removeClass('col-on');
		});
	});
	$('a.table-col-box').click(function(e){
		e.preventDefault();
		var $td = $(this).parent(),
			$idx = $td.index();
		$(this).closest('table').find('tr').each(function(){
			$(this).children().eq($idx).addClass('col-on').siblings().removeClass('col-on');
		});
	});
};

/* 레이어 팝업 */
var $popSpeed = 300,
	$popOpenBtn = '';
var popupUI = function(){
	$(document).on('click','.ui-pop-open',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$(document).on('click','.ui-pop-close',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_wrap');
		popClose($pop);
	});

	/*
	//팝업 bg 클릭시 닫힘 기능
	$('.pop_wrap').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);} 	//배경 클릭시 안닫히게 할때는 close_none 클래스 추가로 처리
	}).on('click','.popup',function(e) {
		e.stopPropagation();
	});
	*/
};
var popOpen = function(tar,btn){
	if($(tar).length < 1 || $(tar).children('.popup').length < 1) return console.log('해당팝업없음');
	var $visible = $('.pop_wrap:visible').size();
	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}
	$('body').addClass('pop_open');	
	$(tar).fadeIn($popSpeed,function(){
		$(this).attr({'tabindex':0}).focus();
	});
	popPosition(tar,$popSpeed);
	$(window).on('resizeEnd',function(){
		popPosition(tar,$popSpeed);
	});
};
var popClose = function(tar){
	var $visible = $('.pop_wrap:visible').size();
	if($visible == 1){
		$('body').removeClass('pop_open');
	}
	$(tar).find('.popup').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
var popPosition = function(tar,speed){
	setTimeout(function(){
		var $wrapH = $(tar).height(),
			$pop = $(tar).find('.popup'),
			$popCont = $pop.find('.pop_cont'),
			$popBtn = $pop.find('.pop_btn');

		$popCont.removeAttr('style');

		var $popH = $pop.outerHeight(),
			$mT = Math.max(0,($wrapH-$popH)/2),
			$popContT = $popCont.position().top,
			$popContH = $popCont.outerHeight(),
			$popBtnH = $popBtn.outerHeight(),
			$popContMaxH = Math.max(0,($popH-$popContT-$popBtnH));

		if($popContH > $popContMaxH)$popCont.css({'height':$popContMaxH});

		if(speed > 100){
			$pop.stop().animate({'margin-top':$mT},speed);
		}else{
			$pop.css({'margin-top':$mT});
		}
	},10);
};

/* btn */
var btnUI = function(){
	//a태그 링크 '#', '#none' 이동 방지
	$(document).on('click','a',function(e){
		var $href = $(this).attr('href');
		if($href == '#' || $href == '#none' )e.preventDefault();
	});
	$(document).on('click','.button.disabled',function(e){
		return false;
	});
	

	//버튼 클릭 효과
	$(document).on('click', '.button, .list_link', function(e){
		var $btnEl = $(this),
			$delay = 650,
			$href = $btnEl.attr('href');
		if($href == '#' || $href == '#none')e.preventDefault();

		//if(!$btnEl.hasClass('disabled') && $btnEl.closest('.btn_wrap').size() > 0){
		if(!$btnEl.is('.disabled')){
			if($btnEl.find('.btn_click_in').length == 0) $btnEl.prepend('<i class="btn_click_in"></i>');
			var $btnIn = $btnEl.find('.btn_click_in'),
				$btnMax = Math.max($btnEl.outerWidth(),$btnEl.outerHeight()),
				$btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
				$btnY = e.pageY - $btnEl.offset().top - $btnMax/2;

			$btnIn.css({
				'left':$btnX,
				'top':$btnY,
				'width':$btnMax,
				'height':$btnMax
			}).addClass('animate').delay($delay).queue(function(next){
				$btnIn.remove();
				next();
			});
		}
	});

	//포트폴리오 설정
	$(document).on('click','.list-setting .btn_setting',function(e){
		e.preventDefault();
		var $this = $(this),
			$box = $this.closest('.list-setting');

		if($box.hasClass('on')){
			$box.removeClass('on');
		}else{
			$('.list-setting').removeClass('on');
			$box.addClass('on');
		}
	});
	if($('.list-setting').length > 0){
		$(document).on(clickType,function(){
			$('.list-setting').removeClass('on');
		}).on(clickType,'.list-setting',function(e) {
			e.stopPropagation();
		});
	}

	//차트 이미지 크게보기(미사용, 다른 플러그인으로 대체)
	$(document).on('click','.ui-img-expand',function(e){
		e.preventDefault();
		var $img = $(this).siblings('img').clone();
		var $layer = '<div class="layer-wrap img-layer"><div class="layer"><div class="img"></div><a href="#" class="btn_close">닫기</a></div></div>';
		$('body').append($layer);
		$('.img-layer .img').html($img);
	});
	$(document).on('click','.img-layer .btn_close',function(e){
		e.preventDefault();
		$('.img-layer').remove();
	});
};

/* 토글 기능 */
var $toggleSpeed = 500;
var toggleUI = function(btn,isTxtChange){
	$(document).on('click',btn,function(){
		if($(this).hasClass('disabled')) return;
		var $target,
			isList = false;
		if($(this).parents('.toggle-list').size() > 0){
			$target = $(this).closest('li').find('.toggle_cont');
			isList = true;
		}else{
			$target = $(this).data('target');
		}
		if($($target).is(':animated')) return;
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			if(isTxtChange)$(this).text('상세보기 열기');
			$($target).stop().slideUp($toggleSpeed);
		}else{
			$(this).addClass('on');
			if(isTxtChange)$(this).text('상세보기 닫기');
			if(isList){
				$($target).closest('li').siblings().find(btn).removeClass('on');
				$($target).closest('li').siblings().find('.toggle_cont').not('.no-toggle').stop().slideUp($toggleSpeed);
			}
			$($target).stop().slideDown($toggleSpeed,function(){
				toggleScroll(this);
			});
		}
	});
};
var toggleScroll = function(tar){
	var $scrollTop = $(window).scrollTop(),
		$winH = $(window).height(),
		$top = $(tar).offset().top,
		$height = $(tar).outerHeight(),
		$gap = ($top+$height)-($scrollTop+$winH);
	if($('.btn_wrap.fixed').length > 0)$gap += $('.btn_wrap.fixed').outerHeight();
	var	$scroll = Math.min($top,$scrollTop+$gap);
	if($gap>0)$('html, body').stop().animate({'scrollTop':$scroll},$toggleSpeed);
};
var toggleEtc = function(){
	$(document).on('click','.ui-rdo-toggle [type=radio]',function(){
		var $closest = $(this).closest('.ui-rdo-toggle'),
			$isToggle = $(this).data('toggle'),
			$target = $closest.next();

		if($(this).prop('readonly') || $(this).prop('disabled') || $target.is(':animated')) return false;
		if($isToggle == 'close'){
			$target.stop().slideUp($toggleSpeed);
		}else if($isToggle == 'open'){
			$target.stop().slideDown($toggleSpeed,function(){
				toggleScroll(this);
			});
		}
	});

	//faq_list
	$(document).on('click','.faq_list > li > a',function(e){
		e.preventDefault();
		$(this).next('div').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('div').slideUp(300);
	});
};

/* tab 기능 */
var tabUI = function(){
	var $onText = '<span class="blind">현재위치</span>';

	$(document).on('click','.ui-tabmenu a',function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');
			$(href).addClass('on').siblings('.tab_cont').removeClass('on');
			$(this).prepend($onText).parent().addClass('active').siblings().removeClass('active').find('.blind').remove();
		}

		//웹 접근성 보완
		var $role = $(this).attr('role');
		if($role == 'tab'){
			var $tabpanel = $(this).attr('aria-controls');
			$(this).attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);
			$('#'+$tabpanel).attr('aria-expanded',true).siblings('[role=tabpanel]').attr('aria-expanded',false);
		}
	});

	var $wrap = $('.tab_wrap');
	if($wrap.length > 0){
		$(window).on('scroll resize',function(){
			var $scrollTop = $(this).scrollTop(),
				$haedH = $('#header').outerHeight();

			$wrap.each(function(index, element){
				var $this = $(this),
					$thisTop = $this.offset().top,
					$height = $this.outerHeight(),
					$st = Math.floor($thisTop);
				if($st <= $scrollTop){
					$this.addClass('fixed').css('height',$height);
				}else{
					$this.removeClass('fixed').removeAttr('style');
				}
			});
		});
	}

	$(window).load(function(){
		var $href = location.href;

		if($('.ui-tabmenu').length > 0){
			$('.ui-tabmenu').each(function(index, element) {
				var $this = $(this);
				$this.find('li').eq(0).find('a').trigger('click');
			});
		}
	});
};

/* 툴팁 */
var tooltipUI = function(){
	$(document).tooltip({
		items:".tooltip, .tooltip-img, [data-tooltip-img]",
		track:true,
		content:function() {
			var element = $( this );
			if(element.is( "[data-tooltip-img]" ) ) {
				var img = element.data('tooltip-img'),
					  alt = element.data('tooltip-alt');
				return "<img src='"+ img +"' alt='"+alt+"'/>";
			}
			if(element.hasClass("tooltip-img")){
				return element.attr("alt" );
			}
			if(element.hasClass("tooltip")){
				return element.attr("title");
			}
		}
	});

	//열기
	$(document).on('click','.btn_tip-wrap button.btn_tip, .btn_tip-wrap button.ico-text',function(e){
		e.preventDefault();
		var $this = $(this),
			$box = $this.closest('.btn_tip-wrap').find('.tip-box');

		if($box.hasClass('on')){
			$box.removeClass('on');
			//$box.closest('.btn_tip-wrap').removeClass('on');
		}else{
			$('.tip-box').removeClass('on').removeAttr('style');
			$box.addClass('on');
			//$box.closest('.btn_tip-wrap').addClass('on');
		}

		$(window).resize(function(){
			//console.log('resize');
			var $winW = $(window).width(),
				$sideMargin = 15;
			$box.removeAttr('style');
			var $boxLeft = $box.offset().left,
				$boxWidth = $box.outerWidth(),
				$boxMarginLeft = parseInt($box.css('margin-left'));

			if($boxLeft < 0 || $boxLeft+$boxWidth > $winW-$sideMargin){
				if($boxLeft < 0){
					$boxLeft = Math.abs($boxLeft);
					$boxMarginLeft = $boxMarginLeft + $boxLeft + $sideMargin;
				}else if($boxLeft+$boxWidth > $winW-$sideMargin){
					$boxMarginLeft = Math.max(((-$boxWidth)+$sideMargin), $boxMarginLeft + $winW - $boxLeft - $boxWidth - $sideMargin);
				}
				$box.css({
					'margin-left':$boxMarginLeft,
					'max-width': $winW-($sideMargin*2)
				});
				$box.find('.arr').css({
					'left': Math.abs($boxMarginLeft)
				});
			}else{
				$box.find('.arr').removeAttr('style');
			}
		});
		$(window).resize();
	});
	//닫기
	$(document).on('click','.tip-close',function(e){
		e.preventDefault();
		$(this).closest('.tip-box').removeClass('on').removeAttr('style');
	});
	//툴팁외 영역 클릭시 닫기
	if($('.tip-box').length > 0){
		$(document).on(clickType,function(){
			$('.btn_tip-wrap .tip-box').removeClass('on').removeAttr('style');
		}).on(clickType,'.btn_tip-wrap',function(e) {
			e.stopPropagation();
		});
	}
};

/* TOP 버튼: 상단이동 */
var btnTopUI = function() {
	var settings = {
			button      : '#btnTop',
			text        : '컨텐츠 상단으로 이동',
			min         : 100,
			fadeIn      : 400,
			fadeOut     : 400,
			scrollSpeed : 800,
			easingType  : 'easeInOutExpo'
		};

   $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '"><i class="fa fa-arrow-up" aria-hidden="true"></i><span class="blind">' + settings.text + '</span></a>');
	$(settings.button+',.btn_top' ).on('click', function( e ){
		e.preventDefault();
		$('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
	})
	.on('mouseenter', function() {
		$( settings.button ).addClass('hover');
	})
	.on('mouseleave', function() {
		$( settings.button ).removeClass('hover');
	});

	$(window).scroll(function() {
		var position = $(window).scrollTop();
		if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );  }
		else { $( settings.button ).fadeOut( settings.fadeOut );  }
	});
};

/* 같은 높이값부여 */
var maxHeight = function(tar, item){
	$(window).on('resize',function(){
		var $tar = $(tar);
		$tar.each(function(){
			var $heightArry = [],
				$item = $(this).find(item);
			if(item == null)$item = $(this).children();
			$item.each(function(){
				$(this).css('height','auto');
				var $height = $(this).outerHeight();
				$heightArry.push($height);
			});
			var $maxHeight = Math.max.apply(null, $heightArry);
			$item.css('height',$maxHeight);
		});
	});
};

/* 다중 Swiper */
var swiperInit = function(){
	if($('.ui-swiper').length > 0)multiSwiper('.ui-swiper');
};
var $swipers = [];
var multiSwiper = function(tar){
	$(tar).each(function(i, element){
		var $this = $(this),
			$prev = $this.find('.swiper-button-prev'),
			$next = $this.find('.swiper-button-next'),
			$pagination = $this.find('.swiper-pagination'),
			$type = $this.data('swiper'); 						//data-swiper

		//setting
		if($this.find('.swiper-container').length > 0){
			$container = $this.find('.swiper-container');
		}else{
			$container = $this;
		}
		$container.addClass('ui-swipe-s'+i);
		if($prev.length > 0)$prev.addClass('ui-swipe-l'+i);
		if($next.length > 0)$next.addClass('ui-swipe-r'+i);
		if($pagination.length > 0)$pagination.addClass('ui-swipe-p'+i);

		//option
		var $option,
			$isNaviIn = false;
		switch($type){
			case 'navi':
				$option ={
					slidesPerView: 'auto',
					freeMode: true,
					//centerInsufficientSlides: true,
					navigation:{
						prevEl: '.ui-swipe-l'+i,
						nextEl: '.ui-swipe-r'+i,
					}
				};
				$isNaviIn = true;
				break;
			case 'vertical':
				$option ={
					direction: 'vertical',
					autoHeight: true,
					pagination:{
						el: '.ui-swipe-p'+i
					}
				};
				break;
			default:
				$option ={
					autoHeight: true,
					pagination:{
						el: '.ui-swipe-p'+i
					}
				};
				break;
		}

		//Swiper init
		var $swiper = new Swiper('.ui-swipe-s'+i,$option);
		$swipers.push($swiper);

		//event
		if($isNaviIn == true){
			var $active = $this.find('.active'),
				$activeIdx = $active.index(),
				$activeLeft = $active.position().left,
				$activeWidth = $active.outerWidth();

			if($(window).width() < ($activeLeft+$activeWidth))$swipers[i].slideTo($activeIdx);
		}
	});
};

/* 스크롤 애니메이션 */
var scrollItem = function(){
	var $elements = $.find('*[data-animation]'),
		$window = $(window);

	$(window).on('scroll resize',function(){
		$elements = $.find('*[data-animation]');
		if($elements.length > 0){
			checkInView();
		}
	});

	function checkInView(){
		var $wHeight = $window.height(),
			$scrollTop = $window.scrollTop(),
			$winBottom = ($scrollTop + $wHeight - 50);

		$.each($elements, function(){
			var $el = $(this),
				$elHeight = $($el).outerHeight(),
				$elTop = $($el).offset().top,
				$elBottom = $elTop + $elHeight,
				$animationClass = $el.data('animation'),
				$delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$animationIn = $el.data('animation-in');

			if(!$el.hasClass('animated') && $animationClass != 'on'){
				if($delay>0){
					$el.css({
						'-webkit-animation-delay':$delay+'ms',
						'animation-delay':$delay+'ms'
					});
				}
				if($duration>0){
					$el.css({
						'-webkit-animation-duration':$duration+'ms',
						'animation-duration':$duration+'ms'
					});
				}
				$el.addClass('animated');
			}
			if($animationIn){
				if(($elTop >= $scrollTop) && ($elBottom <= $winBottom)){
					$el.addClass($animationClass);
				}else{
					$el.removeClass($animationClass);
				}
			}else{
				if(($elBottom >= $scrollTop) && ($elTop <= $winBottom)){
					$el.addClass($animationClass);
				}
			}
		});
	}
};

/* 입력 텍스트 카운팅 */
var wordCount = function(){
	$(document).on('keyup','[data-word-count]',function(){
		var $this = $(this),
			$val = $this.val(),
			$max = $this.attr('maxlength'),
			$length = $val.length,
			$tar = $('#'+$this.data('word-count'));

		$tar.text(Math.min($max,$length));
	});
};

/* 입력 금액 텍스트 변환 */
var priceTextChange = function(){
	var arrNiumverWord = ['','일','이','삼','사','오','육','칠','팔','구'],
		arrDigitWord = ['','십','백','천'],
		arrManWord = ['','만 ','억 ','조 ','경 ','해 ','자 ','양 '];
	$(document).on('keyup','[data-price-txt]',function(){
		var $this = $(this),
			$val = removeComma($this.val()),
			$length = $val.length,
			$tar = $('#'+$this.data('price-txt'));
		if(isNaN($val) == true) return;
		var hanText = '',
			manCount = 0;
		for(i=0;i<$length;i++){
			//1단위의 문자로 표시(0은 제외)
			var strTextWord = arrNiumverWord[$val.charAt(i)];
			//console.log(strTextWord);

			//0이 아닌경우만, 십/백/천 표시
			if(strTextWord != ""){
				manCount++;
				strTextWord += arrDigitWord[($length - (i+1)) % 4];
				//console.log(arrDigitWord[($length - (i+1)) % 4]);
			}

			//만단위마다 표시(0인경우 만단위는 표시)
			if(manCount != 0 && (($length - (i+1)) % 4) == 0){
				manCount = 0;
				strTextWord += arrManWord[($length - (i+1)) / 4];
				//console.log(arrManWord[($length - (i+1)) / 4]);
			}

			hanText += strTextWord;
		}
		if($val != 0) hanText += ' 원';
		$tar.text(hanText);
	});
};

/* 텍스트 글자별 효과 */
var splitText = function(tar){
	var $tar = $(tar);
	$tar.each(function(){
		var $this = $(this),
			$split = $(this).html().split(''),
			$html = '',
			$tag = '',
			$isTag = false,
			$style = $(this).attr('style'),
			j = 0,
			$delay = $(this).data('sp-delay'),
			$distance = $(this).data('sp-distance');

		if($delay == null)$delay = 200;

		$this.css('height',$this.height()).html('');
		for(var i in $split){
			if($isTag){
				$tag += $split[i];
				if($split[i] == '>'){
					$isTag = false;
					$html += $tag;
				}
			}else{
				if($split[i] == '<'){
					$tag = $split[i];
					$isTag = true;
				}else if($split[i] == ' '){
					$html += '<span class="spt">&nbsp;</span>';
				}else{
					j++;
					$html += '<span class="spt" style="';
					$html += '-webkit-transition-delay:'+(j*$delay)+'ms;';
					$html += 'transition-delay:'+(j*$delay)+'ms;';
					if($distance != null){
						var $posX = random(-$distance,$distance),
							$posY = random(-$distance,$distance),
							$posZ = random(-$distance,$distance),
							$scale = random(0.3,0.8);

						$html += '-webkit-transform:translate3d('+$posX+'px,'+$posY+'px,'+$posZ+'px) scale('+$scale+');';
						$html += 'transform:translate3d('+$posX+'px,'+$posY+'px,'+$posZ+'px) scale('+$scale+');';
					}
					$html += '">';
					$html += $split[i];
					$html += '</span>';
				}
			}
		}
		$this.html($html).removeAttr('style');
		if($style)$this.attr('style',$style);
	});
};

/* 텍스트 타이핑 효과 */
var typingTextInit = function(){
	$('.ui-typing-text').data('once',true);
	$(window).on('scroll resize',function(){
		$('.ui-typing-text').each(function(){
			var $once = $(this).data('once');
			if($(this).hasClass('on') && $once == true){
				$(this).data('once',false);
				typingText(this);
			}
		});
	});
};
var typingText = function(tar){
	var $this = $(tar),
		$split = $this.text().split(''),
		$br = '<br>',
		$brArry = searchString($br,$this.html()),
		$style = $this.attr('style'),
		$speed = $this.data('tp-speed'),
		$delay = $this.data('tp-delay'),
		$isCursor = $this.data('tp-cursor'),
		$cursor = '<span class="tp-cursor" aria-hidden="true">|</span>',
		$html = '';

	if($speed == null)$speed = 200;
	if($delay == null)$delay = 0;

	$this.css('height',$this.height()).html('<span class="tp_txt"></span>');
	if($isCursor != false)$this.append($cursor);
	setTimeout(function(){
		if($isCursor == false)$this.append($cursor);
		for(var i = 0; i < $split.length; i++){
			(function(i,char){
				setTimeout(function(){
					$html += char;
					if( $brArry.length > 0){
						for(var j = 0; j < $brArry.length; j++){
							var n = j*$br.length;
							if(i == ($brArry[j] - n))$html += '<br>';
						}
					}
					//console.log(i,$html);
					$this.find('.tp_txt').html($html);
					if( i == $split.length){
						$this.removeAttr('style');
						if($style)$this.attr('style',$style);
					}
				},i*$speed);
			})(i+1,$split[i]);
		}
	},$delay);
	if($isCursor == false){
		setTimeout(function(){
			$this.find('.tp-cursor').remove();
		},$delay+(($split.length+2)*$speed));
	}
};
var searchString = function(substring,string){
	var a = [],
		i = -1;
	while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
	return a;
};

/* 숫자 롤링효과 */
var rollingNumberInit = function(){
	$('.ui-roll-number').data('once',true);
	$(window).on('scroll resize',function(){
		$('.ui-roll-number').each(function(){
			var $html = $(this).text(),
				$once = $(this).data('once');
			if($(this).hasClass('on') && $once == true){
				$(this).data('once',false);
				rollingNumber(this,$html);
			}
		});
	});
};
var rollingNumber = function(tar,num){
	var $this = $(tar),
		$split = num.split(''),
		$style = $this.attr('style'),
		$height =$this.height(),
		$numRepeat = 2,
		$repeatNum = $numRepeat*10-1;

	$this.css('height',$height).html('');
	for(var i in $split){
		if($split[i] == ','){
			$this.append('<span class="num-comma">'+$split[i]+'</span>');
		}else{
			$this.append('<span class="num-item" style="height:'+$height+'px;line-height:'+$height+'px;"><span class="rol"></span></span>');
			for(var j=$repeatNum;j>=0;j--){
				var k = j%10;
				$this.find('.num-item').last().find('.rol').append('<span>'+k+'</span>');
			}
		}
	}
	$this.data('number',num).removeAttr('style');
	if($style)$this.attr('style',$style);

	$this.children().each(function(e){
		var $idx = $(this).index(),
			$rol = $(this).find('.rol'),
			$num = $split[e];

		$rol.animate({'top':($num-$repeatNum)*$height},1000+($idx*200));
	});
};
var transNumber = function(tar,chageNum){
	if(chageNum == "" || chageNum == undefined)chageNum = '0';
	var $this = $(tar),
		$style = $this.attr('style'),
		$height = $this.height(),
		nowNum = $this.data('number');
	if(nowNum == undefined)nowNum = $this.text();
	if(nowNum == chageNum)return;
	
	$this.css('height',$height).html('');
	
	var $split = chageNum.split('');
	for(var i in $split){
		if($split[i] == ','){
			$this.append('<span class="num-comma">'+$split[i]+'</span>');
		}else{
			$this.append('<span class="num-item">'+$split[i]+'</span>');
		}
	}

	chageNum = removeComma(chageNum);
	nowNum = removeComma(nowNum);
	if(nowNum.length > chageNum.length){
		//숫자길이가 작아질때
		var $delNum = nowNum.substring(chageNum.length,nowNum.length),
			$delSplit = $delNum.split('');
		for(var j in $delSplit){
			if($delSplit[j] != ','){
				$this.append('<span class="num-item num-out">'+$delSplit[j]+'</span>');
			}
		}
	}else{
		//숫자길이가 커질때
		if((chageNum.length - nowNum.length) > 1){
			$this.children('.num-item').eq(nowNum.length-1).nextAll().not('.num-comma').addClass('num-in');
		}else{
			$this.children().last().addClass('num-in');
		}
	}

	$this.data('number',chageNum).removeAttr('style');
	if($style)$this.attr('style',$style);
	setTimeout(function(){
		$this.find('.num-in, .num-out').addClass('show');
		$this.find('.num-out').animate({'width':0},500,function(){
			$(this).remove();
		});
	},100);
};

/* 숫자 countUp */
var countUpInit = function (tar){
	var countUpArry = [];
	$(tar).each(function(i, element){
		var $this = $(this);
		$this.attr('id','countUp'+i);

		var $numNow = $this.data('before'),
			$numUpdate = $this.text(),
			$duration = $this.data('duration'),
			$decimalArry = String($numUpdate).split('.');

		var $decimalCiphers;
		if($decimalArry[1] == null){
			$decimalCiphers = 0;
		}else{
			$decimalCiphers = $decimalArry[1].length;
		}
		if($numNow == null || $numNow == '')$numNow = 0;
		if($duration == null || $duration == '')$duration = 1;

		var countUp =  new CountUp('countUp'+i,$numNow,$numUpdate,$decimalCiphers,$duration,{
			useEasing: true,
			useGrouping: true,
			separator: ',',
			decimal: '.'
		});
		countUpArry.push(countUp);

		$(window).on('scroll resize', function(){
			var $winHeight = $(window).height(),
				$scrollTop = $(window).scrollTop(),
				$winBottom = $scrollTop + ($winHeight*(3/4)),
				$winTop = $scrollTop + ($winHeight*(1/4)),
				$elHeight = $this.outerHeight(),
				$elTop = $this.offset().top,
				$elBottom = ($elTop + $elHeight);

			if (($elBottom >= $winTop) && ($elTop <= $winBottom)) {
				if(!countUpArry[i].error){
					countUpArry[i].start();
				}else{
					console.log(countUpArry[i].error);
				}
			} else {
				countUpArry[i].reset();
			}
		});
	});
};
var countUpListInit = function (tar){
	var countUpListArry = [];
	$(tar).each(function(i, element){
		var $this = $(this);
		$this.attr('id','countUpArry'+i);

		var $numNow = $this.text(),
			$decimalArry = String($numNow).split('.'),
			$numUpdate = $this.data('count').split(','),
			$numLegnth = $numUpdate.length,
			$numIdx = 0;

		var $decimalCiphers;
		if($decimalArry[1] == null){
			$decimalCiphers = 0;
		}else{
			$decimalCiphers = $decimalArry[1].length;
		}

		var countUp =  new CountUp('countUpArry'+i,$numNow,$numUpdate[$numIdx],$decimalCiphers,0.5,{
			useGrouping: true,
			separator: ',',
			decimal: '.'
		});
		countUpListArry.push(countUp);

		function countUpfirst(){
			countUpListArry[i].start();
			$numIdx = $numIdx +1;
			countUpstart();
		}
		var countUpTime;
		function countUpstart(){
			clearTimeout(countUpTime);
			countUpTime = setTimeout(function(){
				if($numIdx == 0){
					$numIdx = $numIdx +1;
				}else if($numIdx == ($numLegnth-1)){
					$numIdx = 0;
				}else{
					$numIdx = $numIdx +1;
				}
				countUpListArry[i].update($numUpdate[$numIdx]);
				countUpstart();
			},4000);
		}
		countUpfirst();
	});
};

/* 메인 하단 뱃지 */
var alarmBox = function(txt,tit,link){
	var $delay = 3000,
		$speed = 500,
		$className = '.alarm_box';

	var $boxHtml = '<div class="'+$className.substring(1)+'">';
		$boxHtml += (link? '<a href="'+link+'">':'<div>');
		if(tit)$boxHtml += '<div class="tit">'+tit+'</div>';
		$boxHtml += '<div class="txt">'+txt+'</div>';
		$boxHtml += (link? '</a>':'</div>');
		$boxHtml += '</div>';

	if($($className).length <= 0){
		$('body').append($boxHtml);
	}else{
		$($className).find('.tit').text(tit);
		$($className).find('.txt').text(txt);
	}

	var $height = $($className).outerHeight();
	$($className).css({'marginBottom':-$height}).dequeue().stop().animate({'marginBottom':0},$speed).delay($delay).animate({'marginBottom':-$height},$speed,function(){
		$(this).remove();
	});
};

/* 날짜 포맷 바꾸기 */
var dateFormat = function(date,format){
	var $date = date;
	if($date.indexOf(format) > -1 ) return $date;
	if($date.indexOf('.') > -1 ){
		return $date.split('.').join(format);
	}else if($date.indexOf('/') > -1 ){
		return $date.split('/').join(format);
 	}else if($date.indexOf(format) > -1 ){
		return $date;
	}else if($date.indexOf(' ') > -1 ){
		return $date.split(' ').join(format);
	}else{
		return $date.substr(0,4) + format + $date.substr(4,2) + format + $date.substr(6,2);
	}
};

/* error 텍스트 */
var alertText = function(tar,text,val){
	if(val == null)val = ture;
	var $tar = $(tar);

	var $size = $('.error_txt').size();
	var $error = $tar.next('.error_txt');
	var $ariaIdTxt = 'ui-alertTxt',
		$ariaId = $ariaIdTxt+($size+1);

	if($error.length > 0){
		$error.show().html(text);
		if($error.attr('id') != null){
			$ariaId = $error.attr('id');
		}else{
			$error.attr('id',$ariaId);
		}
		if(val == false)$error.addClass('blue');
	}else{
		var $html = '<div id="'+$ariaId+'" class="alert_txt error_txt';
		if(val == false)$html += ' fc-blue';
		$html += '">'+text+'</div>';
		$tar.after($html);
	}
	$(tar).attr({
		'aria-invalid':'true',
		'aria-describedby': $ariaId
	}).focus();
};

/* 날짜 구하기 */
var todayTimeString = function (plusDay) { //formatTime(date)
	var $date = new Date();
	if(plusDay != null)$date.setDate($date.getDate() + plusDay);
	var year = $date.getFullYear();
	var month = $date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
	var day = $date.getDate();
	var hour = $date.getHours();
	var min = $date.getMinutes();

	if (("" + month).length == 1) { month = "0" + month; }
	if (("" + day).length == 1) { day = "0" + day; }
	if (("" + hour).length == 1) { hour = "0" + hour; }
	if (("" + min).length == 1) { min = "0" + min; }

	return ("" + year + month + day + hour + min );
};
var $nowDateFull = parseInt(todayTimeString()),						//날짜,시간,분
	$nowDateHour = parseInt(todayTimeString().substring(0,10)),		//날짜,시간
	$nowDate = parseInt(todayTimeString().substring(0,8)),			//날짜만
	$weekAfterDate = parseInt(todayTimeString(6).substring(0,8)),	//1주일이후 날짜
	$30dayAfterDate = parseInt(todayTimeString(29).substring(0,8)),	//30일이후 날짜
	$nowMonth = parseInt(todayTimeString().substring(0,6));			//년,월
//console.log($nowDateFull,$nowDateHour,$nowDate,$weekAfterDate,$30dayAfterDate,$nowMonth);

/* 팝업 그만보기 */
var todayPopUi = function(){
	$('.ui-todaypop').each(function(i){
		var $this = $(this),
			$thisId = $this.attr('id'), 	//다중 사용을 위해 id 값 체크
			$wrap = $this.parent(),
			$saveDate = parseInt(localStorage.getItem('todayPop-'+$thisId)),
			$saveMonth = parseInt(localStorage.getItem('todayPopMonth-'+$thisId));

		//페이지 로딩 시 노출 여부
		if($nowDate <= $saveDate || $nowMonth == $saveMonth){
			$wrap.remove();
		}else{
			$wrap.show();
		}

		//닫기버튼
		$this.on('click','.ui-todaypop-close',function(){
			// 오늘하루 보지않기
			if($this.find('.ui-todaypop-chk-day').prop('checked')){
				if($saveDate == null || isNaN($saveDate) || $nowDate != $saveDate){
					localStorage.setItem('todayPop-'+$thisId,$nowDate);
				}
			}

			// 일주일간 보지않기
			if($this.find('.ui-todaypop-chk-week').prop('checked')){
				if($saveDate == null || isNaN($saveDate) || $weekAfterDate > $saveDate){
					localStorage.setItem('todayPop-'+$thisId,$weekAfterDate);
				}
			}

			// 이번달에 보지않기
			if($this.find('.ui-todaypop-chk-month').prop('checked')){
				if($saveMonth == null || isNaN($saveMonth) || $nowMonth != $saveMonth){
					localStorage.setItem('todayPopMonth-'+$thisId,$nowMonth);
				}
			}

			// 30일간 보지않기
			if($this.find('.ui-todaypop-chk-day30').prop('checked')){
				if($saveDate == null || isNaN($saveDate) || $30dayAfterDate > $saveDate){
					localStorage.setItem('todayPop-'+$thisId,$30dayAfterDate);
				}
			}

			// 다신 보지않기
			if($this.find('.ui-todaypop-chk-naver').prop('checked')){
				if($saveDate == null || isNaN($saveDate) || $30dayAfterDate > $saveDate){
					localStorage.setItem('todayPop-'+$thisId,'99999999');
				}
			}

			//닫기
			$wrap.remove();
		});

		//보지않기 다중체크 방지
		$this.on('change','.today_bar input[type=checkbox]',function(){
			if($(this).prop('checked')){
				$(this).parent().siblings().find('input[type=checkbox]').prop('checked',false);
			}
		});
	});
};

/* 로딩창 */
var loadingHtml;
var loadingShow = function(txt){
	var $loading =$('<div id="loading"><div><div class="ico_morse"></div><em class="txt_info">'+txt+'</em></div></div>'),
		$id = $('#loading');

	loadingHtml = setTimeout(function(){
		if($id.length == 0){
			$('body').append($loading);		

			if($('html').hasClass('lt-ie10')){
				//console.log('ie9');
				loadingAnimation('#loading .ico_morse',54,23);
			}
		}
	},100);
};
//ie9 에서 로딩창 애니메이션
var $loadingNum = 0;
var $loadTimeout;
var loadingAnimation = function(tar,size,count){
	$(tar).css('background-position','50% -'+$loadingNum*size+'px');
	if($loadingNum < (count-1)){
		$loadingNum++;
	}else{
		$loadingNum = 0;
	}
	//console.log($loadingNum)
	$loadTimeout = setTimeout(function(){
		loadingAnimation(tar,size,count);
	},100);
};
var loadingHide = function(){
	clearTimeout(loadingHtml);
	var $id = $('#loading');
	if($id.length > 0){
		$id.remove();
		if($('html').hasClass('lt-ie10')){
			$loadingNum = 0;
			clearTimeout($loadTimeout);
			//loadingAnimation('.ico_morse',54,23)
		}
	}
};

/********************************
** plugins **
*********************************/
(function($){
	/* resizeEnd 사용법 : (같은 엘리먼트에 다중 사용 안됨)
	* $(window).resizeEnd(function(){console.log('resizeEnd');},300);
	*/
	$.fn.resizeEnd = function(callback, timeout){
		$(this).resize(function(){
			var $this = $(this);
			if($this.data('resizeTimeout')){
				clearTimeout($this.data('resizeTimeout'));
			}
			$this.data('resizeTimeout', setTimeout(callback,timeout));
		});
	};

	/* scrollEnd 사용법 : (같은 엘리먼트에 다중 사용 안됨)
	* $(window).scrollEnd(function(){console.log('scrollEnd');},300);
	*/
	$.fn.scrollEnd = function(callback, timeout){
		$(this).scroll(function(){
			var $this = $(this);
			if($this.data('scrollTimeout')){
				clearTimeout($this.data('scrollTimeout'));
			}
			$this.data('scrollTimeout', setTimeout(callback,timeout));
		});
	};

	/* changeClass 사용법 :
	* $(this).changeClass('on', 'off');
	*/
	$.fn.changeClass = function(removeClassName,addClassName){
		var element = this;
		element.removeClass(removeClassName).addClass(addClassName);
	};

	/* addRemoveClass 사용법 :
	* $(this).addRemoveClass('on', 500, 1000);
	*/
	$.fn.addRemoveClass = function(className,addTime,removeTime){
		var element = this;
		var addIt = function(){
			element.addClass(className);
		};
		var removeIt = function(){
			element.removeClass(className);
		};
		setTimeout(function(){addIt();setTimeout(removeIt,removeTime);},addTime);
		return this;
	};

	/* scrollIn 사용법 :
	* $(this).scrollIn();
	* ios 나 안드로이드에서 focus() 했을때 스크롤 안되는 현상 대체함수
	*/
	$.fn.scrollIn = function(){
		var $this = $(this),
			$top = $this.offset().top,
			$wrap = $('html, body'),
			$height = $(window).height() - 50;
		setTimeout(function(){
			var $scrollTop = $(window).scrollTop();
			if($top <= $scrollTop || ($scrollTop+$height) <= $top){
				$wrap.stop().animate({'scrollTop':($top-50)},300);
			}
		},50);
		return this;
	};
}(jQuery));