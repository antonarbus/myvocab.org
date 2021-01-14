/*
  ACTION: add "delete account" into settings
*/

function isSafari() {
  return navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;
}

$('#input5').
  on('focusin', function() {
    if(isSafari()) return;

    let val = $(this).val();
    if (!val && wordsArr.length) {
      val = wordsArr.sort(compareKeysForSortArrFn('added', 'asc'))[0].added;
    }

    val = val.
      replaceAll('.', '-').
      replaceAll(' ', 'T').
      replaceAll('<br>', 'T').
      slice(0, 16);

    $(this).siblings('input').hide();
    $(this).attr('type', 'datetime-local');
    $(this).addClass('datetime');
    $(this).attr('value', val);
    $(this).val(val);
  }).
  on('focusout', function() {
    if(isSafari()) return;
    $(this).siblings('input').show();
    $(this).removeAttr('type', 'datetime-local');
    $(this).removeClass('datetime');
    $(this).val(
      $(this).val().
      replaceAll('-', '.').
      replaceAll('T', ' ').
      replaceAll('<br>', ' ')
    );
  })

$('#input6').
  on('focusin', function() {
    if(isSafari()) return;
    let val = $(this).val();
    if (!val && wordsArr.length) {
      val = wordsArr.sort(compareKeysForSortArrFn('added', 'desc'))[0].added;
    }

    val = val.
      replaceAll('.', '-').
      replaceAll(' ', 'T').
      replaceAll('<br>', 'T').
      slice(0, 16);

    $(this).siblings('input').hide();
    $(this).attr('type', 'datetime-local');
    $(this).addClass('datetime');
    $(this).val(val);
  }).
  on('focusout', function() {
    if(isSafari()) return;
    $(this).siblings('input').show();
    $(this).removeAttr('type', 'datetime-local');
    $(this).removeClass('datetime');
    $(this).val(
      $(this).val().
      replaceAll('-', '.').
      replaceAll('T', ' ').
      replaceAll('<br>', ' ')
    );
  })

$('#input13').
  on('focusin', function() {
    if(isSafari()) return;
    let val = $(this).val();
    if (!val && wordsArr.length) {
      val = wordsArr.sort(compareKeysForSortArrFn('tested', 'asc'))[0].tested;
    }

    val = val.
      replaceAll('.', '-').
      replaceAll(' ', 'T').
      replaceAll('<br>', 'T').
      slice(0, 16);

    $(this).siblings('input').hide();
    $(this).attr('type', 'datetime-local');
    $(this).addClass('datetime');
    $(this).val(val);
  }).
  on('focusout', function() {
    if(isSafari()) return;
    $(this).siblings('input').show();
    $(this).removeAttr('type', 'datetime-local');
    $(this).removeClass('datetime');
    $(this).val(
      $(this).val().
      replaceAll('-', '.').
      replaceAll('T', ' ').
      replaceAll('<br>', ' ')
    );
  })

$('#input14').
  on('focusin', function() {
    if(isSafari()) return;
    let val = $(this).val();
    if (!val && wordsArr.length) {
      val = wordsArr.sort(compareKeysForSortArrFn('tested', 'desc'))[0].tested;
    }

    val = val.
      replaceAll('.', '-').
      replaceAll(' ', 'T').
      replaceAll('<br>', 'T').
      slice(0, 16);

    $(this).siblings('input').hide();
    $(this).attr('type', 'datetime-local');
    $(this).addClass('datetime');
    $(this).val(val);
  }).
  on('focusout', function() {
    if(isSafari()) return;
    $(this).siblings('input').show();
    $(this).removeAttr('type', 'datetime-local');
    $(this).removeClass('datetime');
    $(this).val(
      $(this).val().
      replaceAll('-', '.').
      replaceAll('T', ' ').
      replaceAll('<br>', ' ')
    );
  })






let wordsArr = [];
let tbl, sharedTbl;
let audio = new Audio();
let downKey = -1
let lastCategory = false;
let searchedRecently = false;
let isWordTesting = true;
let keyNum = 0;
let isTest = false;
let isLoggedUser = 0;

// **************** time functions ****************

function timeNowForTable() {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  const timeStamp = year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString();
  return timeStamp;
}

function timeNow() {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  const timeStamp = year + '.' + month + '.' + day + '<br>' + hours + ':' + minutes + ':' + seconds;
  return timeStamp;
}

// **************** cookies ****************

function setCookie(CookieName, CookieValue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = CookieName + '=' + CookieValue + ';' + expires + ';path=/';
}

function cookieVal(CookieName) {
  let name = CookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function isCookie(CookieName) {
  let CookieValue = cookieVal(CookieName);
  if (CookieValue != '') {
    return true;
  }
  else {
    return false;
  }
}

// **************** buttons in corner ****************

// **************** credentials ****************

$('#login-btn').on('click', () => loginWindow())

function loginWindow() {
  $('#dimmed, #login-menu').show();
  $('#login-menu input').val('');
  $('html,body').scrollTop(0).scrollLeft(0);

  if(isCookie('Mail')) {
    $('#mail').val(cookieVal('Mail')).focus();
    $('#password').focus();
  }
}

// blink if user exists
(function() {
  $('#mail').on('input', () => signUpOrIn())

  let timeoutSignUpOrIn;

  function signUpOrIn() {
    if (timeoutSignUpOrIn) clearTimeout(timeoutSignUpOrIn);
    timeoutSignUpOrIn = setTimeout(() => {
      $.ajax({
        type: 'POST',
        url: '/phps/sign_up_or_in.php',
        data: {
          Mail: $('#mail').val().trim(),
        },
        success: function (data) {
          if (data) {
            blink($('#sign-up-in-btn'));
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          $('#bottom-logos').hide();
          $('#bottom-error').show().text('/phps/sign_up_or_in.php');
          setTimeout(() => { $('#bottom-logos').show(); $('#bottom-error').hide(); }, 10000);
        },
      });
    }, 1000);
  }
})();

// TAB, jump from login to password
$('#mail').on('keydown', function (e) {
  e.stopPropagation();
  if (e.key == 'Tab' || e.key == 'Enter') {
    e.preventDefault();
    $('#password').focus();
  }
});

// TAB, jump from pass to login
// ENTER, login
$('#password').on('keydown', function (e) {
  e.stopPropagation();
  if (e.key == 'Tab') {
    e.preventDefault();
    $('#mail').focus();
  }
  else if (e.key == 'Enter') {
    e.preventDefault();
    signUpSignIn();
  }
});

function loginVisualy() {
  $('#user-logged').html(cookieVal('Mail'));
  $('#logged-box').show();
  $('#login-btn, #stranger-warning').hide();
  menuOff();
}

$('#sign-up-in-btn').on('click', () => signUpSignIn())

let incorrectPass = 0;

function signUpSignIn() {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test($('#mail').val().trim().toLowerCase()) || !$('#password').val() || !$('#mail').val().trim()) {
    shake($('.logpass'));
    return;
  }

  $('#sign-up-in-btn').addClass('disable');

  $.post(
    '/phps/sign_up_sign_in.php',
    {
      Mail: $('#mail').val().replace(/\s/g, ''),
      Password: $('#password').val(),
      OldTable: cookieVal('Stranger'),
    },
    async function (data) {
      $('#sign-up-in-btn').removeClass('disable');

      if (data) {
        // https://ads.google.com/aw/conversions/detail?ocid=207159831&ctId=316698128&authuser=0&__u=4878804690&__c=5649151519
        function gtag_report_conversion(url) {
          let callback = () => {
            if (typeof url != 'undefined') window.location = url;
          };

          gtag('event', 'conversion', {
            send_to: 'AW-867087266/8QeDCJDcgZcBEKLnup0D',
            event_callback: callback,
          });
          return false;
        }

        incorrectPass = 0;
        setCookie('Friend', data, 45);
        setCookie('Mail', $('#mail').val().trim().toLowerCase(), 45);
        $('#tbl tbody').empty();
        gtag_report_conversion();
        manageCookiesAndVars();
        unsubscribeLink();
        await getUserSettings();
        await loadStrangerOrFirendTable();
        testLink();
      }
      else {
        incorrectPass = incorrectPass + 1;
        if (incorrectPass <= 3) {
          alert('Fail #' + incorrectPass + '. After 3 fails you can reset your password.');
        }
        else {
          if (confirm('Reset password?')) {
            incorrectPass = 0;
            alert('Password will be mailed soon');
            menuOff();

            $.post(
              '/phps/new_pass.php',
              {
                Mail: $('#mail').val().trim(),
              },
              function (data) {
                alert('Check your mail inbox and spam folders for new password');
              }
            );
          }
        }
      }
    }
  );
}

$('#pass-restore-btn').on('click', () => {

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mail = $('#mail');

  if (!re.test(mail.val().trim().toLowerCase()) || !mail.val().trim()) {
    shake(mail.add(mail.next()));
    return;
  }

  $('#pass-restore-btn').addClass('disable');
  alert('Password will be mailed soon');

  $.post(
    '/phps/new_pass.php',
    {
      Mail: mail.val().trim(),
    },
    function (data) {
      alert(`
Check your mail inbox and spam folders for new password.

You can change password in settings.
      `);
      $('#pass-restore-btn').removeClass('disable');
    }
  );
})

$('#confirm-pswd-btn').on('click', () => сonfirmPassword())

function сonfirmPassword() {
  if ($('#new-pass').val() == $('#new-pass-again').val() && $('#new-pass').val()) {
    $('#confirm-pswd-btn').addClass('disable');
    $.ajax({
      type: 'POST',
      url: '/phps/update_password.php',
      data: {
        Mail: $('#user-logged').html(),
        Password: $('#new-pass').val(),
      },
      success: function (data) {
        if (data) {
          $('#confirm-pswd-btn').text('Done');
          setTimeout(function () {
            $('#confirm-pswd-btn').text('Confirm').removeClass('disable');
            $('#new-pass, #new-pass-again').val('');
            menuOff();
          }, 2000);
        }
        else {
          $('#confirm-pswd-btn').text('Something went wrong');
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#bottom-logos').hide();
        $('#bottom-error').show();
        $('#bottom-error').text('/phps/update_password.php');
        setTimeout(() => {
          $('#bottom-logos').show();
          $('#bottom-error').hide();
        }, 10000);
      },
    });
  }
  else {
    alert('Passwords are not identical');
  }
}

$('#logout-btn').on('click', () => logout())

function logoutVisualy() {
  $('#logged-box, #undo-btn').hide();
  $('#login-btn, #stranger-warning').show();
  $('#user-logged').html('Unknown');
  $('#mail, #password').val('');
}

function logout() {
  if(isTest)stopTest();
  logoutVisualy();
  setCookie('Friend', 666, -666);
  manageCookiesAndVars();
  loadStrangerOrFirendTable();
}

// **************** progress bar on top ****************

// transition of color and width up to 50% of div width
progressBarStart = () => $('#progress-bar').removeClass('fifty-width hundred-width').show().addClass('fifty-width');

//transition further from 50% to 100% of div width with color change
//on the transition end remove classes and hide el because transition will be still visible
progressBarFinnish = () => {
  $('#progress-bar').addClass('hundred-width').one('transitionend', function () {
      setTimeout(() => $(this).hide(), 500);
    });
};

// **************** excel file download ****************

$('#download-excel-btn').on('click', () => tableToExcel('tbody', 'words', 'vocab.xls'))

// https://stackoverflow.com/questions/17126453/html-table-to-excel-javascript
let tableToExcel = (function () {
  let uri = 'data:application/vnd.ms-excel;base64,',
    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta charset="utf-8"/><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
  return function (table, name, filename) {
    if (!table.nodeType) table = document.getElementById(table);
    let ctx = {
      worksheet: name || 'Worksheet',
      table: table.innerHTML.replace(/<br>/gi, ' '),
    };
    document.getElementById('download-excel').href = uri + base64(format(template, ctx));
    document.getElementById('download-excel').download = filename;
    document.getElementById('download-excel').click();
  };
})();

// **************** blink red / green ****************

let blinkGreenTimer, blinkRedTimer;

function blinkGreen() {
  clearTimeout(blinkRedTimer);

  const wordsToTrain = $('#words-num-in-test');
  const el = isWordTesting ? $('#word-textarea') : $('#tranalstion-textarea'); // if else conditional (ternary) operator
  const allEls = el.add(wordsToTrain);

  allEls.removeClass('red-border red-background');

  el.addClass('green-border');
  wordsToTrain.addClass('green-background');

  blinkGreenTimer = setTimeout(() => allEls.removeClass('green-border green-background'), 1000);
}

function blinkRed() {
  clearTimeout(blinkGreenTimer);
  const wordsToTrain = $('#words-num-in-test');
  const el = isWordTesting ? $('#word-textarea') : $('#tranalstion-textarea'); // if else conditional (ternary) operator
  const allEls = el.add(wordsToTrain);

  allEls.removeClass('green-border green-background'); // remove red color from wrong answer if it is not removed yet

  el.addClass('red-border');
  wordsToTrain.addClass('red-background');

  blinkRedTimer = setTimeout(() => allEls.removeClass('red-border red-background'), 1000);
}

// **************** hide / show Example (Category) ****************

function hideOrShowExampleCategory() {
  // needed if we hide column
  // needed to show Category after test

  if ($('#th4').is(':hidden')) {
    $('#example-box').hide();
  } else {
    $('#example-box').show();
  }

  if ($('#th5').is(':hidden')) {
    $('#category-box').hide();
  } else {
    $('#category-box').show();
  }
}

// **************** select options width for safari ****************

function isiOS() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

function isAndroid() {
  return /(android)/i.test(navigator.userAgent);
}

function setSelectionWidth(el) {
  // css text-align-last: center;  not supported in Safari
  // that is why imposible to center text of option in select el
  // make a fake select el and check its width
  // and asign this width to select el
  // in such case it will be centered, becuase width fits 100% to content
  el.css({ width: 'auto' });
  let temp = el.clone().insertAfter(el);
  temp.html('<option>' + el.val() + '</option>');
  el.width(temp.width());
  temp.remove();
}

//show full lang names in select, but insert values, do it via first hidden option element
$('select').on('change', function () {
  $('option:eq(0)', this).val($('option:selected', this).val()).html($('option:selected', this).val());
  $(this).val($('option:selected', this).val());

  // css text-align-last: center;  not supported in Safari
  // that is why imposible to center text of option in select el
  if (isiOS()) setSelectionWidth($(this));

  // just take id name and use it as cookie name
  //setCookie($(this).attr('id'), $(this).val(), 300);
});

function setValsInSelect() {
  $('select').each(function () {
    $('option:eq(0)', this).val($('option:selected', this).val()).html($('option:selected', this).val());
      $(this).val($('option:selected', this).val());
      if (isiOS()) setSelectionWidth($(this));
  });
}

$('#swap-translation-languages-btn').on('click', function () {
  const LangWord = $('#translate-lang-word-select').val();
  const LangTranslation = $('#translate-lang-translation-select').val();
  $('#translate-lang-word-select').val(LangTranslation).trigger('change');
  $('#translate-lang-translation-select').val(LangWord).trigger('change');
});

// **************** clean text ****************

function cleanText(MyText) {
  return MyText.
    replace(/\s\s+/g, ' ') // remove all double spaces
    .replace(/&nbsp;/gi, ' ') // remove white spaces
    .replace(/<[^>]*>/g, '') // remove html tags
    .replace(/(\r\n\t|\n|\r\t)/gm, ' ') // emove new lines
    .replace(/ö/g, 'ö') // replace strange fi charachters
    .replace(/Ö/g, 'Ö')
    .replace(/ä/g, 'ä')
    .replace(/Ä/g, 'Ä')
    .replace(/о́/g, 'о') // replace strange ru charachters
    .replace(/я́/g, 'я')
    .replace(/у́/g, 'у')
    .replace(/а́/g, 'а')
    .replace(/е́/g, 'e')
    .replace(/и́/g, 'и')
    .trim(); //remove space at the end
}

// **************** select and put caret ****************

function selectContents(el) {
  let range = document.createRange();
  range.selectNodeContents(el[0]);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function setCaretToEnd(el) {
  if (el[0].childNodes.length) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el[0].childNodes[0], el[0].childNodes[0].length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  } else {
    el.focus();
    el[0].setSelectionRange(el.val().length, el.val().length);
  }
}

function setCaretToStart(el) {
  if (el[0].childNodes.length) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el[0].childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  } else {
    el.focus();
    el[0].setSelectionRange(0, 0);
  }
}

// **************** expand Example if content is taller ****************

function fixTextareaHeight(el) {
  const paddingTop = parseInt(el.css('padding-top'));
  const scrollHeight = el[0].scrollHeight;

  el.removeAttr('style');
  el[0].style.height = scrollHeight - paddingTop + 6 + 'px';

  // check if scrolling height of text area without padding > textarea height
  if (scrollHeight - paddingTop > 75) {
    el.addClass('textarea-overlay');
  }
  else {
    el.removeClass('textarea-overlay');
    el.addClass('textarea-overlay2');
  }
}

function normilizeTextareaHeight(el) {
  el.removeClass('textarea-overlay textarea-overlay2');
  el.removeAttr('style');
  el.scrollTop(1000);
}

$('textarea')
  .on('focusin', function () {
    fixTextareaHeight($(this));
  })
  .on('focusout', function () {
    normilizeTextareaHeight($(this));
  })
  .on('input', function () {
    normilizeTextareaHeight($(this));
    fixTextareaHeight($(this));
  })

// **************** get words ****************

function returnWordsArrFromServ() {

  $('#empty, #new-vocab-add-words').hide();
  $('#loading').show();

  progressBarStart();
  let dfrd = $.Deferred();

  $.ajax({
    type: 'POST',
    url: '/phps/get-all-words.php',
    data: {
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    success: function (data) {
      wordsArr = $.parseJSON(data);
      // convert to int
      wordsArr = wordsArr.map(({ passed, failed, difficulty, ...rest }) => ({ ...rest, passed: +passed, failed: +failed, difficulty: +difficulty }));
      $('#loading, #new-vocab-add-words').hide();
      $('#empty').show();
      dfrd.resolve();
    },
  });

  return dfrd.promise();
}

function compareKeysForSortArrFn(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

// sort array depending on vals in inputs and arrows
function sortedArrBasedOnInputs() {
  const indexOfRedArrow = $('.red-color').index('.arrow');
  let key, order;

  switch (indexOfRedArrow) {
    case 0: key = 'word'; order = 'asc'; break;
    case 1: key = 'word'; order = 'desc'; break;
    case 2: key = 'translation'; order = 'asc'; break;
    case 3: key = 'translation'; order = 'desc'; break;
    case 4: key = 'example'; order = 'asc'; break;
    case 5: key = 'example'; order = 'desc'; break;
    case 6: key = 'category'; order = 'asc'; break;
    case 7: key = 'category'; order = 'desc'; break;
    case 8: key = 'added'; order = 'asc'; break;
    case 9: key = 'added'; order = 'desc'; break;
    case 10: key = 'passed'; order = 'asc'; break;
    case 11: key = 'passed'; order = 'desc'; break;
    case 12: key = 'failed'; order = 'asc'; break;
    case 13: key = 'failed'; order = 'desc'; break;
    case 14: key = 'difficulty'; order = 'asc'; break;
    case 15: key = 'difficulty'; order = 'desc'; break;
    case 16: key = 'tested'; order = 'asc'; break;
    case 17: key = 'tested'; order = 'desc'; break;
  }

  // sort in acc to the arrow
  let sortedArr = wordsArr.sort(compareKeysForSortArrFn(key, order));

  // filter out
  if($('#input1').val().trim()) sortedArr = sortedArr.filter(x => x.word.toLowerCase().includes($('#input1').val().trim().toLowerCase()));
  if($('#input2').val().trim()) sortedArr = sortedArr.filter(x => x.translation.toLowerCase().includes($('#input2').val().trim().toLowerCase()));
  if($('#input3').val().trim()) sortedArr = sortedArr.filter(x => x.example.toLowerCase().includes($('#input3').val().trim().toLowerCase()));
  if($('#input4').val().trim()) sortedArr = sortedArr.filter(x => x.category.toLowerCase().includes($('#input4').val().trim().toLowerCase()));
  if ($('#input5').val().trim()) {
    const val = $('#input5').val().
      replace(/\.|\:/g, '').
      replace(/&nbsp;/gi, '').
      replace(/(\r\n\t|\n|\r\t)/gm, '').
      replaceAll('-', '').
      replaceAll('T', '')
    ;
    sortedArr = sortedArr.filter((x) => {
      return val <= x.added.
        replace(/\.|\:/g, '').
        replace(/&nbsp;/gi, '').
        replace(/(\r\n\t|\n|\r\t)/gm, '').
        replace(/<[^>]*>/g, '').
        slice(0, val.length);
    });
  }
  if ($('#input6').val().trim()) {
    const val = $('#input6').val().
      replace(/\.|\:/g, '').
      replace(/&nbsp;/gi, '').
      replace(/(\r\n\t|\n|\r\t)/gm, '').
      replaceAll('-', '').
      replaceAll('T', '');

    sortedArr = sortedArr.filter((x) => {
      return val >= x.added.
        replace(/\.|\:/g, '').
        replace(/&nbsp;/gi, '').
        replace(/(\r\n\t|\n|\r\t)/gm, '').
        replace(/<[^>]*>/g, '').
        slice(0, val.length);
    });
  }
  if ($('#input7').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input7').val()) <= x.passed);
  if ($('#input8').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input8').val()) >= x.passed);
  if ($('#input9').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input9').val()) <= x.failed);
  if ($('#input10').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input10').val()) >= x.failed);
  if ($('#input11').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input11').val()) <= x.difficulty);
  if ($('#input12').val().trim()) sortedArr = sortedArr.filter(x => Number($('#input12').val()) >= x.difficulty);
  if ($('#input13').val().trim()) {
    const val = $('#input13').val().
      replace(/\.|\:/g, '').
      replace(/&nbsp;/gi, '').
      replace(/(\r\n\t|\n|\r\t)/gm, '').
      replaceAll('-', '').
      replaceAll('T', '');
    sortedArr = sortedArr.filter((x) => {
      return val <= x.tested.
        replace(/\.|\:/g, '').
        replace(/&nbsp;/gi, '').
        replace(/(\r\n\t|\n|\r\t)/gm, '').
        replace(/<[^>]*>/g, '').
        slice(0, val.length);
    });
  }
  if ($('#input14').val().trim()) {
    const val = $('#input14').val().
      replace(/\.|\:/g, '').
      replace(/&nbsp;/gi, '').
      replace(/(\r\n\t|\n|\r\t)/gm, '').
      replaceAll('-', '').
      replaceAll('T', '')
    ;
    sortedArr = sortedArr.filter((x) => {
      return val >= x.tested.
        replace(/\.|\:/g, '').
        replace(/&nbsp;/gi, '').
        replace(/(\r\n\t|\n|\r\t)/gm, '').
        replace(/<[^>]*>/g, '').
        slice(0, val.length);
    });
  }


  if ($('#input15').val().trim()) {
    const val = $('#input15').val().trim().toLowerCase();
    sortedArr = sortedArr.filter(x => x.word.toLowerCase().includes(val) || x.translation.toLowerCase().includes(val) || x.example.toLowerCase().includes(val) || x.category.toLowerCase().includes(val));
  }
  // put starting word or translation to the top, at first translation, then word
  if($('#input2').val().trim()) {
    const val = $('#input2').val().trim().toLowerCase();
    const startsWithArr = sortedArr.filter(x => x.translation.toLowerCase().startsWith(val));
    const restOfArr = sortedArr.filter(x => !x.translation.toLowerCase().startsWith(val) && x.translation.toLowerCase().includes(val))
    sortedArr = [...startsWithArr, ...restOfArr];
  }
  if($('#input1').val().trim()) {
    const val = $('#input1').val().trim().toLowerCase();
    const startsWithArr = sortedArr.filter(x => x.word.toLowerCase().startsWith(val));
    const restOfArr = sortedArr.filter(x => !x.word.toLowerCase().startsWith(val) && x.word.toLowerCase().includes(val))
    sortedArr = [...startsWithArr, ...restOfArr];
  }
  if ($('#input15').val().trim()) {
    const val = $('#input15').val().trim().toLowerCase();
    let equalArr, startsWithArr, restOfArr;

    // go from category to word in reverse order to come up with word on the top
    equalArr = sortedArr.filter(x => x.category.toLowerCase() == val);
    startsWithArr = sortedArr.filter(x => x.category.toLowerCase() != val && x.category.toLowerCase().startsWith(val));
    restOfArr = sortedArr.filter(x => x.category.toLowerCase() != val && !x.category.toLowerCase().startsWith(val) && (x.word.toLowerCase().includes(val) || x.translation.toLowerCase().includes(val) || x.example.toLowerCase().includes(val) || x.category.toLowerCase().includes(val)));
    sortedArr = [...equalArr, ...startsWithArr, ...restOfArr];

    equalArr = sortedArr.filter(x => x.example.toLowerCase() == val);
    startsWithArr = sortedArr.filter(x => x.example.toLowerCase() != val && x.example.toLowerCase().startsWith(val));
    restOfArr = sortedArr.filter(x => x.example.toLowerCase() != val && !x.example.toLowerCase().startsWith(val) && (x.word.toLowerCase().includes(val) || x.translation.toLowerCase().includes(val) || x.example.toLowerCase().includes(val) || x.category.toLowerCase().includes(val)));
    sortedArr = [...equalArr, ...startsWithArr, ...restOfArr];

    equalArr = sortedArr.filter(x => x.translation.toLowerCase() == val);
    startsWithArr = sortedArr.filter(x => x.translation.toLowerCase() != val && x.translation.toLowerCase().startsWith(val));
    restOfArr = sortedArr.filter(x => x.translation.toLowerCase() != val && !x.translation.toLowerCase().startsWith(val) && (x.word.toLowerCase().includes(val) || x.translation.toLowerCase().includes(val) || x.example.toLowerCase().includes(val) || x.category.toLowerCase().includes(val)));
    sortedArr = [...equalArr, ...startsWithArr, ...restOfArr];

    equalArr = sortedArr.filter(x => x.word.toLowerCase() == val);
    startsWithArr = sortedArr.filter(x => x.word.toLowerCase() != val && x.word.toLowerCase().startsWith(val));
    restOfArr = sortedArr.filter(x => x.word.toLowerCase() != val && !x.word.toLowerCase().startsWith(val) && (x.word.toLowerCase().includes(val) || x.translation.toLowerCase().includes(val) || x.example.toLowerCase().includes(val) || x.category.toLowerCase().includes(val)));
    sortedArr = [...equalArr, ...startsWithArr, ...restOfArr];
  }

  return sortedArr;
}

function displayWordsFromArr(addToBottom = false) {
  progressBarStart();

  $('#empty, #new-vocab-add-words').hide();
  $('#loading').show();

  const arr = sortedArrBasedOnInputs();
  $('body').height($(document).height()); // fix height of body to avoid scrolling up
  if (!addToBottom) $('#tbl tbody').empty();

  const atr = 'contenteditable spellcheck="false"';
  const styleHide = 'style="display:none"';
  const thEls = $('#tbl th');

  const hide1 = thEls.eq(0).is(':hidden') ? styleHide : '';
  const hide2 = thEls.eq(1).is(':hidden') ? styleHide : '';
  const hide3 = thEls.eq(2).is(':hidden') ? styleHide : '';
  const hide4 = thEls.eq(3).is(':hidden') ? styleHide : '';
  const hide5 = thEls.eq(4).is(':hidden') ? styleHide : '';
  const hide6 = thEls.eq(5).is(':hidden') ? styleHide : '';
  const hide7 = thEls.eq(6).is(':hidden') ? styleHide : '';
  const hide8 = thEls.eq(7).is(':hidden') ? styleHide : '';
  const hide9 = thEls.eq(8).is(':hidden') ? styleHide : '';
  const hide10 = thEls.eq(9).is(':hidden') ? styleHide : '';
  const hide11 = thEls.eq(10).is(':hidden') ? styleHide : '';
  // hide12 - last col is always hidden

  // needed for special charachters, otherwise RegExp fn gives error, for ex. if we provide "+" sign
  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  const val = $('#input15').val().trim();
  const re = new RegExp(escapeRegex(val), "ig"); // case insensitive + all matches

  let from = 0;
  let to = Math.min(30, arr.length);

  if (addToBottom) {
    from = +$('#words-num-in-test').text();
    to = Math.min(+$('#words-num-in-test').text() + 30, arr.length);
  }

  for (let i = from; i < to; i++) {
    const el = arr[i];

    let td1 = `<td ${hide1}><span>${i + 1}</span><input type="checkbox" class="chkbx"></td>`;
    let td2 = `<td ${hide2 + atr}>${val ? el.word.replace(re, '<strong>' + val + '</strong>') : el.word}</td>`;
    let td3 = `<td ${hide3 + atr}>${val ? el.translation.replace(re, '<strong>' + val + '</strong>') : el.translation}</td>`;
    let td4 = `<td ${hide4 + atr}>${val ? el.example.replace(re, '<strong>' + val + '</strong>') : el.example}</td>`;
    let td5 = `<td ${hide5 + atr}>${val ? el.category.replace(re, '<strong>' + val + '</strong>') : el.category}</td>`;

    let added = el.added;
    added = added.includes('<br>') ? added.split('<br>')[0] + '<div class="grey-smaller">' + added.split('<br>')[1] + '</div>' : added;
    let td6 = `<td ${hide6}>${added}</td>`;

    let td7 = `<td ${hide7}>${el.passed}</td>`;
    let td8 = `<td ${hide8}>${el.failed}</td>`;
    let dif = el.difficulty;
    //https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    let td9 =
      i > 100
        ? `<td ${hide9}>${dif}</td>`
        : `
            <td ${hide9}>
              <span class="dif_range" data-my-dif="${dif}">
                <span class="dif${dif >= 0 ? 0 : '-fake'}"><span>0</span></span>
                <span class="dif${dif >= 1 ? 1 : '-fake'}"><span>1</span></span>
                <span class="dif${dif >= 2 ? 2 : '-fake'}"><span>2</span></span>
                <span class="dif${dif >= 3 ? 3 : '-fake'}"><span>3</span></span>
                <span class="dif${dif >= 4 ? 4 : '-fake'}"><span>4</span></span>
                <span class="dif${dif >= 5 ? 5 : '-fake'}"><span>5</span></span>
                <span class="dif${dif >= 6 ? 6 : '-fake'}"><span>6</span></span>
                <span class="dif${dif >= 7 ? 7 : '-fake'}"><span>7</span></span>
                <span class="dif${dif >= 8 ? 8 : '-fake'}"><span>8</span></span>
                <span class="dif${dif >= 9 ? 9 : '-fake'}"><span>9</span></span>
                <span class="dif${dif >= 10 ? 10 : '-fake'}"><span>10</span></span>
              </span>
            </td>
          `;

    let tested = el.tested;
    tested = tested.includes('0000') ? '-' : tested;
    tested = tested.includes('<br>') ? tested.split('<br>')[0] + '<div class="grey-smaller">' + tested.split('<br>')[1] + '</div>' : tested;

    let td10 = `<td ${hide10}>${tested}</td>`;
    let td11 = `<td ${hide11}><div>⨉</div></td>`;
    let td12 = `<td>${el.id}</td>`; // always hidden

    $('#tbl tbody').append(`<tr>${td1+td2+td3+td4+td5+td6+td7+td8+td9+td10+td11+td12}</tr>`);
  }

  $('body').css('height', 'auto'); // remove height style from body
  $('#words-num-in-test').text($('#tbl tbody tr').length);
  $('#select-all-checkbox').prop('checked', false);

  $('#loading, #new-vocab-add-words').hide();
  $('#empty').show();

  progressBarFinnish();
}

// arrow click
$('.arrow').on('click', function() {
  if (isTest) return;
  $('.arrow').removeClass('red-color');
  $(this).addClass('red-color');
  displayWordsFromArr();
})

// **************** hide / unhide cols ****************

$('.hide').on('click', function () {
  const th = $(this).closest('th');
  const index = th.index();
  const tdEls = th.closest('table').find('tbody td:nth-child(' + (index + 1) + ')');
  const unhideEl = $('.unhide');
  th.hide();
  tdEls.hide();
  unhideEl.addClass('font-weight-600').addClass('red-color');
  setTimeout(() => unhideEl.removeClass('red-color'), 600);
  if (index == 3) $('#example-box').hide();
  if (index == 4) $('#category-box').hide();
});

$('.unhide').on('click', () => {
  $('#category-box, #example-box, #tbl th, #tbl td').show();
  $('#th12, #tbl td:nth-child(12)').hide();
  $('.unhide').removeClass('font-weight-600');
  setValsInSelect();
});

// **************** pencil ****************

$(document)
  .on('mouseenter', '#tbl tr td:nth-child(n+2):nth-child(-n+5)', function (e) {
    const offset = $(this).offset();
    const top = offset.top;
    const left = offset.left;
    //const bottom = top + $(this).outerHeight();
    const right = left + $(this).outerWidth();
    $('#pencil').css({ top: top + 5 + 'px', left: right - 10 + 'px' }).show();
  })
  .on('mouseleave', '#tbl tr td:nth-child(n+2):nth-child(-n+5)', () => {
    $('#pencil').hide();
  });

// **************** toolTip ****************

let timeoutToolTip, timeoutToolTipRemove;

$('[data-my-tip]')
  .on('mouseenter', function (e) {
    if (isMobile) return; // do not show on phone
    if ($('#stop-test-btn').is(':visible')) return; // do not show tooltip if we are in test mode

    const tooltip = $('#tooltip');
    const tooltiptext = $(this).data('my-tip');
    const xCord = e.clientX;
    const yCord = e.clientY;

    if (timeoutToolTip) clearTimeout(timeoutToolTip);

    timeoutToolTip = setTimeout(function () {
      tooltip.html(tooltiptext);
      tooltip.removeAttr('style').show(); // show out of the screen to get the width
      const tooltipWidth = tooltip.width();
      const tooltipHeight = tooltip.height();
      tooltip.hide();

      // too close to left
      if (xCord - tooltipWidth / 2 < 5) {
        xPostion = 10;
      }
      // too close to right
      else if (xCord + tooltipWidth / 2 + 5 > $(window).width()) {
        xPostion = $(window).width() - tooltipWidth - 20;
      } else {
        xPostion = xCord - tooltipWidth / 2;
      }

      // too close to bottom
      if (yCord + 35 + tooltipHeight > $(window).height()) {
        yPostionStart = yCord - tooltipHeight;
        yPostionEnd = yCord - tooltipHeight - 25;
      } else {
        yPostionStart = yCord;
        yPostionEnd = yCord + 25;
      }

      // smooth slide effect, due to transition on #tooltip and jumping from yPostionStart to yPostionEnd and changing opacity
      tooltip.css({top: yPostionStart + 'px',left: xPostion + 'px',}).show();
      tooltip.css({top: yPostionEnd + 'px',left: xPostion + 'px',opacity: '1',});
      timeoutToolTipRemove = setTimeout(() => tooltip.hide(), 5000);
    }, 500);
  })
  .on('mouseleave', function () {
    $('#tooltip').hide();
    clearTimeout(timeoutToolTip);
    clearTimeout(timeoutToolTipRemove);
  });

// **************** restrict numbers from 0...10 ****************

(function() {
  let timeoutInput;

  $('#input11, #input12').on('input', function () {
    const el = $(this);
    if (timeoutInput) clearTimeout(timeoutInput);

    timeoutInput = setTimeout( () => {
      if (el.val() == '') return;
      let Num = +el.val();
      if (isNaN(Num)) Num = 5;
      Num = Math.max(Num, 0);
      Num = Math.min(Num, 10);
      el.val(Num);
    }, 500);
  });
})();

// **************** distinct categories ****************

function distinctCategoryArr() {
  // prepare distict category vals

  // The map() passes each el to fn and returns an arr with vals returned by that fn
  // Set() stores unique values
  let arrOfUniqueCategories = [...new Set(wordsArr.map(x => x.category))];
  // Filter() returns an arr with els for which fn returns true
  // remove empty vals ""
  arrOfUniqueCategories = arrOfUniqueCategories.filter(x => x != '');
  return arrOfUniqueCategories.sort(compareVals);
}

function compareVals(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a < b ? -1 : b < a ? 1 : 0;
}

// **************** category presets ****************

$('#presets-btn').on('click', () => showPresets())

function showPresets() {
  $('#dimmed, #presets-menu').show();
  $('html,body').scrollTop(0).scrollLeft(0);
  const el = $('#category-container');
  // remove all categories inside container, coz we may add new categories before and want them to be also visible
  el.find('div').remove();

  const categoryArr = distinctCategoryArr();

  if (categoryArr.length) {
    // list all categories
    categoryArr.forEach((x) => el.append(`<div><input type="radio" name="presets"><span>${x}</span></div>`));
    // add seperation line before category elements
    el.prev().addClass('with-devider');
  }
}

// put check mark on line click, no need to click on radio button speicfically
$(document).on('click', '#presets-menu div', function () {
  $(this).children('input').prop('checked', true);
});

// put category into input box and sort
$(document).on('click', '#category-container > div', function () {
  // https://api.jquery.com/jQuery/#jQuery-selector-context
  // same as .find() --> $( "span", this ) is equivalent to $( this ).find( "span" ).
  $('#input4').val($('span', this).text());
  displayWordsFromArr();
  setTimeout(() => menuOff(), 300);
});

// **************** .menu show hide click ****************

// click outside DropDownList
$(document).on('click', function (e) {
  if ($('.menu').is(':visible')) {
    if ($(e.target).closest('.menu').length != 0) {
    }
    else {
      menuOff();
    }
  }
});

$('.close, #dimmed').on('click', () => menuOff());

//let justClosedPopUp = false;

function menuOff() {
  downKey = -1;
  if ($('#filter-learnt-menu').is(':visible')) {
    addAfterDomainInURL();
  }
  $('.pop-up, #dimmed, .menu').hide();
  $('.menu').removeAttr('style').html('').hide().off();
}

$(document)
  .on('focusin', '#category-textarea', function () {
    $(this).select();
  })
  .on('click', '#category-textarea', function (e) {
    e.stopImmediatePropagation();
    if ($('.pop-up').is(':visible')) {
      menuOff();
      return;
    }
    const textarea = $(this);
    const menu = $('#category-textarea-menu');
    menu.html('');
    // put lately selected category on top of the list
    if (lastCategory) menu.append(`<div class="dotted-underscore">${lastCategory}</div>`);
    const categoryArr = distinctCategoryArr();
    categoryArr.forEach((x) => menu.append(`<div>${x}</div>`));

    if (!categoryArr.length) {
      menuOff();
      return;
    }
    else {
      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');

      menu.css({
        top: $(this).offset().top + $(this).outerHeight() + 15 + 'px',
        left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
        width: 'auto',
      }).show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        textarea.val($(this).text()).focus();
        setTimeout(() => menuOff(), 300);
      });
    }
  })
  .on('input', '#category-textarea', function (e) {
    e.stopImmediatePropagation();
    const textarea = $(this);
    const val = textarea.val().trim();
    const menu = $('#category-textarea-menu');
    if (val == '') {
      menuOff();
      return;
    }
    menu.html('');
    const categoryArr = distinctCategoryArr();
    const arr = categoryArr.filter((x) => x.toLowerCase().includes(val.toLowerCase()));
    // full match, no need to show
    if (arr.includes(val)) {
      menuOff();
      return;
    }
    arr.forEach((x) => menu.append(`<div>${x.toLowerCase().replace(val.toLowerCase(), '<strong>' + val + '</strong>')}</div>`));

    if (!arr.length) {
      menuOff();
      return;
    }
    else {
      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');

      menu.css({
        top: $(this).offset().top + $(this).outerHeight() + 15 + 'px',
        left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
        width: 'auto',
      }).show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        textarea.val($(this).text()).focus();
        setTimeout(() => menuOff(), 300);
      });
    }
  });

$(document)
  .on('focusin', '#tbl tr td:nth-child(5)', function () {
    selectContents($(this));
  })
  .on('click', '#tbl tr td:nth-child(5)', function (e) {
    e.stopImmediatePropagation();
    if ($('.pop-up').is(':visible')) {
      menuOff();
      return;
    }

    const td = $(this);
    const val = td.text().trim();
    const menu = $('#category-td-menu');
    menu.html('');
    // put lately selected category on top of the list
    if (lastCategory) menu.append(`<div class="dotted-underscore">${lastCategory}</div>`);
    const categoryArr = distinctCategoryArr();
    categoryArr.forEach((x) => menu.append(`<div>${x}</div>`));
    if (!categoryArr.length) {
      menuOff();
      return;
    }
    else {
      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');

      menu.css({
        top: $(this).offset().top + $(this).outerHeight() + 15 + 'px',
        left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
        width: 'auto',
      }).show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        td.html($(this).text()).blur();
        $('#bottom-logos').hide();
        $('#bottom-loading').show();

        const id = td.parent().children().eq(11).text();
        const category = $(this).text();

        $.post(
          '/phps/update_category.php',
          {
            Category: category,
            ID: id,
            Table: tbl,
            isLoggedUser: isLoggedUser,
          },
          function (data) {
            // find index in array
            const index = wordsArr.findIndex(x => x.id == id);
            // modify change object in array
            wordsArr[index].category = category;
            $('#bottom-logos').show();
            $('#bottom-loading').hide();
          }
        );

        $(this).addClass('downKeyHighlight');
        setTimeout(() => menuOff(), 300);
      });
    }
  })
  .on('input', '#tbl tr td:nth-child(5)', function (e) {
    //e.stopImmediatePropagation(); - another event handler
    const td = $(this);
    const val = td.text().trim();
    const menu = $('#category-td-menu');

    if (val == '') { menuOff(); return; }
    menu.html('');
    const categoryArr = distinctCategoryArr();
    const arr = categoryArr.filter((x) => x.toLowerCase().includes(val.toLowerCase()));
    // full match, no need to show
    if (arr.includes(val)) { menuOff(); return;}

    arr.forEach((x) => menu.append(`<div>${x.toLowerCase().replace(val.toLowerCase(), '<strong>' + val + '</strong>')}</div>`));
    if (!arr.length) {
      menuOff();
      return;
    }
    else {
      menu.css({
        top: $(this).offset().top + $(this).outerHeight() + 15 + 'px',
        left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
        width: 'auto',
      });

      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');
      menu.show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        td.html($(this).text()).blur();
        $('#bottom-logos').hide();
        $('#bottom-loading').show();

        const id = td.parent().children().eq(11).text();
        const category = $(this).text();

        $.post(
          '/phps/update_category.php',
          {
            Category: $(this).text(),
            ID: td.parent().children().eq(11).text(),
            Table: tbl,
            isLoggedUser: isLoggedUser,
          },
          function (data) {
            // find index in array
            const index = wordsArr.findIndex(x => x.id == id);
            // modify change object in array
            wordsArr[index].category = category;
            $('#bottom-logos').show();
            $('#bottom-loading').hide();
          }
        );

        $(this).addClass('downKeyHighlight');
        setTimeout(() => menuOff(), 300);
      });
    }
  });

$(document)
  .on('click', '#input4', function (e) {
    e.stopImmediatePropagation();
    if ($('.pop-up').is(':visible')) {
      menuOff();
      return;
    }
    const input = $(this);
    const menu = $('#category-input-menu');
    menu.html('');
    // put lately selected category on top of the list
    if (lastCategory) menu.append(`<div class="dotted-underscore">${lastCategory}</div>`);
    const categoryArr = distinctCategoryArr();
    categoryArr.forEach((x) => menu.append(`<div>${x}</div>`));

    if (!categoryArr.length) {
      menuOff();
      return;
    }
    else {
      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');

      menu.css({
        top: $(this).offset().top + $(this).outerHeight() + 10 + 'px',
        left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
        width: 'auto',
      }).show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        input.val($(this).text()).focus();
        displayWordsFromArr();
        setTimeout(() => menuOff(), 300);
      });
    }
  })
  .on('input', '#input4', function (e) {
    e.stopImmediatePropagation();
    const input = $(this);
    const val = input.val().trim();
    const menu = $('#category-input-menu');
    if (val == '') {
      menuOff();
      return;
    }

    menu.html('');
    const categoryArr = distinctCategoryArr();
    const arr = categoryArr.filter((x) => x.toLowerCase().includes(val.toLowerCase()));

    // full match, no need to show
    if (arr.includes(val)) {
      menuOff();
      return;
    }

    arr.forEach((x) => menu.append(`<div>${x.toLowerCase().replace(val.toLowerCase(), '<strong>' + val + '</strong>')}</div>`));

    if (!arr.length) {
      menuOff();
      return;
    }
    else {
      downKey = 0;
      menu.children().eq(downKey).addClass('downKeyHighlight');

      menu
        .css({
          top: $(this).offset().top + $(this).outerHeight() + 10 + 'px',
          left: $(this).offset().left + $(this).outerWidth() / 2 - menu.outerWidth() / 2 + 'px',
          width: 'auto',
        })
        .show();

      menu.children().on('click', function (e) {
        e.stopImmediatePropagation();
        lastCategory = $(this).text();
        input.val($(this).text()).focus();
        displayWordsFromArr();
        setTimeout(() => menuOff(), 300);
      });
    }
  });

$(document).on('input', '#input15', function (e) {
  const val = $(this).val().trim();
  const menu = $('#category-search-menu');
  const input = $('#input15');
  if (val == '') { menuOff(); return; }
  menu.html('');
  // get arr with first 20  matched els
  let arr = wordsArr.sort(compareKeysForSortArrFn('word')); // sort array to have words in ascending order
  const startsWithArr = arr.filter((x) => x.word.toLowerCase().startsWith(val.toLowerCase())).slice(0, 20);
  const remainingArr = arr.filter(x =>!x.word.toLowerCase().startsWith(val.toLowerCase()) && x.word.toLowerCase().includes(val.toLowerCase())).slice(0, 20);
  const translationArr = arr.filter((x) => x.translation.toLowerCase().includes(val.toLowerCase())).slice(0, 20);
  arr = [...startsWithArr, ...remainingArr, ...translationArr];
  arr.forEach((x) => menu.append(`<div><div>${x.word.replace(val, '<strong>' + val + '</strong>')}</div> <aside>${x.translation.replace(val, '<strong>' + val + '</strong>')}</aside></div>`));

  if (arr.length) {
    downKey = 0;
    menu.children().eq(downKey).addClass('downKeyHighlight');
    menu.css({ top: '100%', right: '0px', width: '262px' }).show();

    menu.children().on('click', function (e) {
      e.stopImmediatePropagation();
      input.val($(this).find('div').text());
      searchFourInputs();
      $(':focus').blur();
      setTimeout(() => menuOff(), 300);
    });
  }
  else {
    menuOff();
  }
});

// mouse inside menu
$(document).on('mouseenter', '.menu > *', function () {
  $('.menu').children().removeClass('downKeyHighlight');
  downKey = $(this).index();
  $(this).addClass('downKeyHighlight');
});

// **************** add new word ****************

$('#add-btn').on('click', () => add())

function add() {
  // add new word in table and sql
  if ($('#word-textarea').val() == '' && $('#tranalstion-textarea').val() == '' && $('#example-textarea').val() == '') {
    $('#word-textarea').focus();
    shake($('#add-btn, #word-textarea, #tranalstion-textarea'));
    return;
  }

  $('#add-btn').attr('disabled', true);

  const word = cleanText($('#word-textarea').val());
  const translation = cleanText($('#tranalstion-textarea').val());
  const example = cleanText($('#example-textarea').val());
  const category = cleanText($('#category-textarea').val());
  const id = Math.random().toString(36).slice(2, 7);
  const time = timeNow();
  const tested = '0000.00.00<br>00:00:00';

  $.ajax({
    type: 'POST',
    url: '/phps/add.php',
    data: {
      Word: word,
      Translation: translation,
      Example: example,
      Category: category,
      Added: time,
      Passed: 0,
      Failed: 0,
      Difficulty: 5,
      Tested: tested,
      ID: id,
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    success: function (data) {
      if (data) {
        wordsArr.push({
          word : word,
          translation: translation,
          example: example,
          category: category,
          added: time,
          passed: 0,
          failed: 0,
          difficulty: 5,
          tested: tested,
          id: id
        })
      }
      else {
        $('#bottom-logos').hide();
        $('#bottom-error').show().text('smth wrong during adding');
        setTimeout(() => {$('#bottom-logos').show(); $('#bottom-error').hide();}, 10000);
      }

      $("[id*='input']").each(function () {
        let text_value = $(this).val();
        if (text_value != '') {
          $("[id*='input']").val('');
          shake($("[id*='input']"));
          $(':focus').blur();
          searchedRecently = false;
          return false;
        }
      });

      $('.arrow').removeClass('red-color');
      $('#arrow10').addClass('red-color');
      displayWordsFromArr();

      $('#words-num-in-test').text($('#tbl tbody tr').length);
      $('#word-textarea, #tranalstion-textarea, #example-textarea').val('');
      setTimeout(() => $('#add-btn').attr('disabled', false), 1000);
      $('#update-from-textarea-box').hide();
      $('#start-test-box').show();
      $('#word-textarea').focus();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('add.php');
      setTimeout(() => {$('#bottom-logos').show(); $('#bottom-error').hide();}, 10000);
    },
  });

  $('#word-textarea').focus();
  setTimeout(() => $('#add-btn').attr('disabled', false), 1000);
}

// **************** test ****************

let shouldRemoveLearntWords = true;

$('#remove-learnt-words').on('click', () => filterLearntWords());

function filterLearntWords() {
  const rememberNuberOfWordsInTest = +$('#words-num-in-test').text();
  $('#input11').val(1);
  $('#start-test-box').show();
  $('#stop-test-box').hide();
  $('#filter-learnt-words-loading').show();
  $('#remove-learnt-words, #leave-learnt-words').addClass('disable');
  shouldRemoveLearntWords = true;
  displayWordsFromArr();
  $('#words-num-in-test').text(rememberNuberOfWordsInTest);
  $('#filter-learnt-words-loading').hide();
  $('#remove-learnt-words, #leave-learnt-words').removeClass('disable');
  menuOff();
  startTest();
}

$('#leave-learnt-words').on('click', () => doNotFilterLearntWords());

function doNotFilterLearntWords() {
  menuOff();
  shouldRemoveLearntWords = false;
  startTest();
}

function returnRandomNumFromTo(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$('#start-test-btn').on('click', () => startTest())

async function testTimeStamp() {
  let url = 'phps/test_time_stamp.php';
  let formData = new FormData();
  formData.append('tbl', tbl);
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  //console.log(result);
}

async function saveTestSettings() {
  const thEls = $('#tbl th');

  const settingsObj = {
    input1: $('#input1').val(),
    input2: $('#input2').val(),
    input3: $('#input3').val(),
    input4: $('#input4').val(),
    input5: $('#input5').val(),
    input6: $('#input6').val(),
    input7: $('#input7').val(),
    input8: $('#input8').val(),
    input9: $('#input9').val(),
    input10: $('#input10').val(),
    input11: $('#input11').val(),
    input12: $('#input12').val(),
    input13: $('#input13').val(),
    input14: $('#input14').val(),
    input15: $('#input15').val(),
    indexOfRedArrow: $('.red-color').index('.arrow'),
  }

  let url = 'phps/save_settings.php';
  let formData = new FormData();
  formData.append('tbl', tbl);
  formData.append('settingsObj', JSON.stringify(settingsObj));
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  //console.log(result);
}

let testingWordId;
let linksArr = [];
let isReplyCorrect = true;

function addAfterDomainInURL(text = '/') {
  history.pushState({}, null, text);
}

function startTest() {
  // wordsArr.filter(x => x.isInTest) - that is how we may check words in test in console
  $('html,body').scrollTop(0).scrollLeft(0);
  linksArr = [];

  let numberOfWordInTest = Math.min(+$('#words-num-in-test').text(), $('#tbl tbody tr').length);
  $('#words-num-in-test').text(numberOfWordInTest);

  if (numberOfWordInTest == 0) {
    //push start button, but nothing to test
    shake($('#start-test-btn, #words-num-in-test'));
    setTimeout(() => alert('no words to test'), 1000);
    alert('nothing to test');
    return;
  }

  // check if in visible words we have words with difficulty = 0
  if (shouldRemoveLearntWords && sortedArrBasedOnInputs().slice(0, numberOfWordInTest).filter(x => !x.difficulty).length) {

    // but if all of them are already learnt, then there is nothing to test
    // in such case we test already leant words
    if (!sortedArrBasedOnInputs().slice(0, numberOfWordInTest).filter(x => x.difficulty).length == 0) {
      $('#dimmed, #filter-learnt-menu').show();
      return;
    }
  }
  shouldRemoveLearntWords = true;

  // if any checkbox is selected, mark checked words in wordsArr for being added to test
  if($('.chkbx:checked').length) {
    $('.chkbx:checked').each(function () {
      const id = $(this).closest('td').siblings().last().text();
      wordsArr.map((x) => {
        if (x.id == id) {
          x.isInTest = true;
          x.stillTesting = true;
          x.failsInTest = 0;
          x.learntInTest = false;
          x.attemptsInTest = 0;
        }
      })
    })
  }
  // otherwise add all visible ones
  else {
    sortedArrBasedOnInputs().slice(0, numberOfWordInTest).map((x) => {
      x.isInTest = true;
      x.stillTesting = true;
      x.failsInTest = 0;
      x.learntInTest = false;
      x.attemptsInTest = 0;
    })
  }

  if (isLoggedUser) saveTestSettings();
  if (isLoggedUser) testTimeStamp();

  $("[id*='input'], input[type=checkbox]").prop('disabled', true);
  $('#input15').prop('disabled', false);

  $('#translate-box, #start-test-box, #update-from-textarea-box, #category-box, #add-box, #presets-btn').hide();
  $('#check-box, #stop-test-box, #hint-box').show();
  $('#test-settings-box').detach().appendTo('#stop-test-box');

  $('input[type=checkbox]').attr('disabled', 'true');
  $('#words-num-in-test').prop('contenteditable', false);

  // no interaction for #sound-endless-on-btn, #sound-endless-off-btn

  $('#tbl tbody').addClass('almost-white');
  $('.dif_range').addClass('opacity01');

  if (isMobile) {
    $('#fixed-horizontally').css({ left: '0px' });
    $('#tbl-loading, header, #search-reset-box').hide();
  }

  $('#word-textarea, #example-textarea').val('');
  $('#word-textarea, #tranalstion-textarea').attr('placeholder', 'Answer').addClass('green_placeholder');

  numberOfWordsInTest = wordsArr.filter(x => x.isInTest).length;
  const randNum = returnRandomNumFromTo(0, numberOfWordsInTest - 1);
  testingWordId = wordsArr.filter(x => x.isInTest)[randNum].id;
  // find index in array
  const index = wordsArr.findIndex(x => x.id == testingWordId);

  if ($('#reverse-test-btn').is(':hidden')) {
    // direct or combo test mode
    isWordTesting = true;
    const translation = wordsArr[index].translation;
    $('#tranalstion-textarea').val(translation);
    scrollDownAllTxtAreas();
    $('#word-textarea').focus();
  }
  // reverse test mode
  else {
    isWordTesting = false;
    const word = wordsArr[index].word;
    $('#word-textarea').val(word);
    scrollDownAllTxtAreas();
    $('#tranalstion-textarea').focus();
  }

  // normilizeTextareaHeight($('#word-textarea'));
  // normilizeTextareaHeight($('#tranalstion-textarea'));
  // fixTextareaHeight($('#word-textarea'));
  // fixTextareaHeight($('#tranalstion-textarea'));

  addAfterDomainInURL("test");
  isTest = true;
}

$('#check-btn').on('click', () => check())

function check() {
  audio.pause();
  audio.currentTime = 0;
  audio.src = '';

  $('.play-pic, #next-box, #update-from-test-box').show();
  $('#check-box, #hint-box').hide();
  $('.play-pic').removeClass('playing');
  $('#test-settings-box > *').removeClass('playing');

  // find index in array
  const index = wordsArr.findIndex(x => x.id == testingWordId);
  const word = wordsArr[index].word;
  const translation = wordsArr[index].translation;
  const example = wordsArr[index].example;
  const failsInTest = wordsArr[index].failsInTest;
  const attemptsInTest = wordsArr[index].attemptsInTest;

  $('#example-textarea').val(example);
  scrollDownAllTxtAreas();

  if (isWordTesting) {
    // we are in direct test mode now
    $('#word-textarea').focus(); // not to hide keyboard on phone

    //if answer is correct
    if ($('#word-textarea').val().toUpperCase().trim() == word.toUpperCase().trim()) {
      isReplyCorrect = true;
      $('#learnt-word-btn').show();
    }
    //if answer is wrong
    else {
      isReplyCorrect = false;
      $('#word-textarea').val(word);
      $('#typo-word-btn').show();
    }
  }
  // we are in reverse test mode now and testing translation
  else {
    $('#tranalstion-textarea').focus(); // not to hide keyboard on phone

    if ($('#tranalstion-textarea').val().toUpperCase().trim() == translation.toUpperCase().trim()) {
      //if answer is correct
      isReplyCorrect = true;
      $('#learnt-translation-btn').show();
    }
    //if answer is wrong
    else {
      isReplyCorrect = false;
      $('#tranalstion-textarea').val(translation);
      $('#typo-translation-btn').show();
    }
  }

  // play sound on answer
  if ($('#sound-word-btn').is(':visible')) {
    if(isWordTesting) {
      playSound(word, $('#sound-word-select').val());
    }
    else {
      playSound(translation, $('#sound-translation-select').val());
    }
    $('#sound-word-btn').addClass('playing');
  }
  else if ($('#sound-word-translation-btn').is(':visible')) {
    playSound(word, $('#sound-word-select').val(), translation, $('#sound-translation-select').val());
    $('#sound-word-translation-btn').addClass('playing');
  }
  else if ($('#sound-word-example-btn').is(':visible')) {
    playSound(word, $('#sound-word-select').val(), example, $('#sound-example-select').val());
    $('#sound-word-example-btn').addClass('playing');
  }
  else if ($('#sound-example-btn').is(':visible')) {
    playSound(example, $('#sound-example-select').val());
    $('#sound-example-btn').addClass('playing');
  }
  else if ($('#sound-word-translation-example-btn').is(':visible')) {
    playSound(word, $('#sound-word-select').val(), translation, $('#sound-translation-select').val(), example, $('#sound-example-select').val());
    $('#sound-word-translation-example-btn').addClass('playing');
  }

  if (isReplyCorrect) {
    blinkGreen();
    // change difficlulty, check if we failed before
    wordsArr[index].difficulty = failsInTest ? wordsArr[index].difficulty - 1 : wordsArr[index].difficulty - 3;
    wordsArr[index].passed = wordsArr[index].passed + 1;
    wordsArr[index].learntInTest = (wordsArr[index].difficulty <= 0) ? true : false;
    wordsArr[index].stillTesting = false;

    // if word is leanrt
    if (wordsArr[index].difficulty <= 0) {
      if (isWordTesting) {
        $('#learnt-word-btn').hide();
        $('#learnt-word-message').show();
      }
      else {
        $('#learnt-translation-btn').hide();
        $('#learnt-translation-message').show();
      }
    }
  }
  else {
    blinkRed();
    wordsArr[index].difficulty = wordsArr[index].difficulty + 2;
    wordsArr[index].failsInTest = failsInTest + 1;
    wordsArr[index].failed = wordsArr[index].failed + 1;
    if($('#sound-endless-on-btn').is(':hidden')) wordsArr[index].stillTesting = false;
  }

  wordsArr[index].attemptsInTest = attemptsInTest + 1;
  wordsArr[index].tested = timeNow();

  normilizeTextareaHeight($('#word-textarea'));
  normilizeTextareaHeight($('#tranalstion-textarea'));
  scrollDownAllTxtAreas();
  //fixTextareaHeight($('#word-textarea'));
  //fixTextareaHeight($('#tranalstion-textarea'));
}

$('#next-btn').on('click', () => next())

function next() {
  $('#typo-word-btn, #typo-translation-btn, #learnt-word-btn, #learnt-translation-btn, #learnt-word-message, #learnt-translation-message').hide();
  const numberOfWordsInTest = wordsArr.filter(x => x.isInTest && x.stillTesting).length;
  //const numberOfWordsInTest = ($('#sound-endless-on-btn').is(':visible')) ? wordsArr.filter(x => x.isInTest && !x.learntInTest).length : wordsArr.filter(x => x.isInTest && !x.learntInTest && !x.attemptsInTest).length;
  $('#words-num-in-test').text(numberOfWordsInTest);

  if (!numberOfWordsInTest) {
    stopTest();
    return
  }

  const randNum = returnRandomNumFromTo(0, numberOfWordsInTest - 1);
  testingWordId = wordsArr.filter(x => x.isInTest && x.stillTesting)[randNum].id;
  // find index in array
  const index = wordsArr.findIndex(x => x.id == testingWordId);
  const word = wordsArr[index].word;
  const translation = wordsArr[index].translation;
  const example = wordsArr[index].example;

  // testing word
  if ($('#direct-test-btn').is(':visible')) {
    isWordTesting = true;
  }
  // testing translation
  else if ($('#reverse-test-btn').is(':visible')) {
    isWordTesting = false;
  }
  else {
    isWordTesting = returnRandomNumFromTo(0, 1) ? true : false;
  }

  if (isWordTesting) {
    $('#word-textarea, #example-textarea').val('');
    $('#tranalstion-textarea').val(translation);
    $('#word-textarea').focus();
  }
  else {
    $('#tranalstion-textarea, #example-textarea').val('');
    $('#word-textarea').val(word);
    $('#tranalstion-textarea').focus();
  }

  normilizeTextareaHeight($('#word-textarea'));
  normilizeTextareaHeight($('#tranalstion-textarea'));
  scrollDownAllTxtAreas();
  //fixTextareaHeight($('#word-textarea'));
  //fixTextareaHeight($('#tranalstion-textarea'));

  $('#update-from-test-box, #next-box').hide();
  $('#check-box, #hint-box').show();

  // download mp3 just when we know the word to minimize the lug
  if ($('#sound-word-btn').is(':visible')) {
    if(isWordTesting) {
      getSoundLink(word, $('#sound-word-select').val());
    }
    else {
      getSoundLink(translation, $('#sound-translation-select').val());
    }
  }
  else if ($('#sound-word-translation-btn').is(':visible')) {
    getSoundLink(word, $('#sound-word-select').val(), translation, $('#sound-translation-select').val());
  }
  else if ($('#sound-word-example-btn').is(':visible')) {
    getSoundLink(word, $('#sound-word-select').val(), example, $('#sound-example-select').val());
  }
  else if ($('#sound-example-btn').is(':visible')) {
    getSoundLink(example, $('#sound-example-select').val());
  }
  else if ($('#sound-word-translation-example-btn').is(':visible')) {
    getSoundLink(word, $('#sound-word-select').val(), translation, $('#sound-translation-select').val(), example, $('#sound-example-select').val());
  }

  scrollDownAllTxtAreas();
}

$('#stop-test-btn').on('click', () => stopTest())

function stopTest() {
  $('header').show();
  linksArr.length == 0 ? $('#download-contaier').hide() : $('#download-contaier').show();

  $('#zero-mistakes').text(wordsArr.filter(x => x.attemptsInTest && !x.failsInTest).length);
  $('#one-mistakes').text(wordsArr.filter(x => x.attemptsInTest && x.failsInTest == 1).length);
  $('#two-mistakes').text(wordsArr.filter(x => x.attemptsInTest && x.failsInTest == 2).length);
  $('#three-mistakes').text(wordsArr.filter(x => x.attemptsInTest && x.failsInTest >= 3).length);
  $('#learnt').text(wordsArr.filter(x => x.attemptsInTest && x.learntInTest).length);
  setTimeout( () => $('#dimmed').fadeIn(), 50);
  setTimeout( () => $('#test-results').fadeIn(), 300);
  $('html,body').scrollTop(0).scrollLeft(0);
  $('#example-textarea, header, #start-test-box, #translate-box, #add-box, #tbl-loading, #search-reset-box, #presets-btn').show();
  $('#check-box, #update-from-test-box, #typo-word-btn, #typo-translation-btn, #learnt-word-btn, #learnt-translation-btn, #learnt-word-message, #learnt-translation-message, #stop-test-box, #hint-box, #next-box').hide();
  $('#test-settings-box').detach().appendTo('#start-test-box'); //attach it back under button
  $('#word-textarea').attr('placeholder', 'Word');
  $('#tranalstion-textarea').attr('placeholder', 'Translation');
  $('#example-textarea').attr('placeholder', 'Comment');
  $('#category-textarea').attr('placeholder', 'Category');
  $('#word-textarea, #tranalstion-textarea').removeClass('green_placeholder');
  hideOrShowExampleCategory();
  $("[id*='input']").prop('disabled', false);
  $('#words-num-in-test').prop('contenteditable', true);
  $('#word-textarea, #tranalstion-textarea, #example-textarea').val('');
  $('#tbl tbody').removeClass('almost-white');
  $('.dif_range').removeClass('opacity01');
  $('input[type=checkbox]').removeAttr('disabled');
  $('#main-radio').prop('checked', true);
  addAfterDomainInURL();
  resetInputs();
  normilizeTextareaHeight($('#word-textarea'));
  normilizeTextareaHeight($('#tranalstion-textarea'));
  normilizeTextareaHeight($('#example-textarea'));
  scrollDownAllTxtAreas();
  isWordTesting = true;
  isReplyCorrect = false;

  const testedWordsArr = wordsArr.filter(x => x.isInTest && x.attemptsInTest);

  // round difficulty from -1 tov0 and from 11 to 10
  testedWordsArr.map(x => x.difficulty = Math.min(10, Math.max(0, x.difficulty )));

  // send tested lines to server to update passed, failed, difficulty, tested
  // get texted els
  const JSONarr = JSON.stringify(testedWordsArr);

  // attemts during the test with reduce function // https://www.youtube.com/watch?v=sWa2Zll83EE
  let checks = testedWordsArr.reduce((total, x) => total + x.attemptsInTest, 0)

  if(testedWordsArr.length) {
    $.ajax({
      type: 'POST',
      url: '/phps/test_results.php',
      data: {
        JSONarr: JSONarr,
        Table: tbl,
        isLoggedUser: isLoggedUser,
        TableWithDate: tbl + ' - ' + timeNow().slice(0, 10),
        DateNow: timeNow().slice(0, 10),
        Checks: checks,
      },
      success: function (data) {
        wordsArr.filter(x => x.isInTest).map(x => {
          delete x.isInTest;
          delete x.failsInTest;
          delete x.learntInTest;
          delete x.attemptsInTest;
          delete x.stillTesting
        })
      }
    });
  }
  // if we started test, but did not test actually
  else {
    wordsArr.filter(x => x.isInTest).map(x => {
      delete x.isInTest;
      delete x.failsInTest;
      delete x.learntInTest;
      delete x.attemptsInTest;
      delete x.stillTesting
    })
  }

  isTest = false;
  $("[id*='input']").val('');
  shake($("[id*='input']"));
  $(':focus').blur();

  $('.arrow').removeClass('red-color');
  $('#arrow18').addClass('red-color');
  displayWordsFromArr();
}

$('#typo-word-btn, #typo-translation-btn').on('click', () => acceptAnswer())

function acceptAnswer() {
  // if we test word, focus to Word textare, othrewise soft keyboard goes away
  isWordTesting ? $('#word-textarea').focus() : $('#tranalstion-textarea').focus();
  blinkGreen();

  const index = wordsArr.findIndex(x => x.id == testingWordId);
  wordsArr[index].passed = wordsArr[index].passed + 1;
  const failsInTest = wordsArr[index].failsInTest;
  // if failed and immediately accept, then it is the same as answered correctly from the first attempt
  wordsArr[index].difficulty = (failsInTest == 1) ? wordsArr[index].difficulty - 2 - 3 : wordsArr[index].difficulty - 2 - 1;
  wordsArr[index].failsInTest = failsInTest - 1;
  wordsArr[index].failed = wordsArr[index].failed - 1;
  wordsArr[index].learntInTest = (wordsArr[index].difficulty <= 0) ? true : false;
  wordsArr[index].stillTesting = false;

  if (wordsArr[index].difficulty <= 0) {
    if (isWordTesting) {
      $('#learnt-word-btn').hide();
      $('#learnt-word-message').show();
    }
    else {
      $('#learnt-translation-btn').hide();
      $('#learnt-translation-message').show();
    }
  }

  isReplyCorrect = false;
  scrollDownAllTxtAreas();
  $('#typo-word-btn, #typo-translation-btn').hide();
}

$('#learnt-word-btn, #learnt-translation-btn').on('click', () => difficultyZero())

function difficultyZero() {
  blinkGreen();
  const index = wordsArr.findIndex(x => x.id == testingWordId);
  if (isWordTesting) {
    $('#learnt-word-btn').hide();
    $('#learnt-word-message').show();
    $('#word-textarea').focus();
  }
  else {
    $('#learnt-translation-btn').hide();
    $('#learnt-translation-message').show();
    $('#tranalstion-textarea').focus();
  }

  wordsArr[index].difficulty = 0;
  wordsArr[index].learntInTest = true;
}

$('#update-from-test-btn').on('click', () => updateInTest())

function updateInTest() {
  if ($('#word-textarea').val().replace(/\n/g, '') == '') { $('#word-textarea').focus(); return; }
  progressBarStart();

  const word = cleanText($('#word-textarea').val());
  const translation = cleanText($('#tranalstion-textarea').val());
  const example = cleanText($('#example-textarea').val());

  $.ajax({
    type: 'POST',
    url: '/phps/update.php',
    data: {
      Word: word,
      Translation: translation,
      Example: example,
      ID: testingWordId,
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    success: function (data) {
      if (data == "updated") {
        const index = wordsArr.findIndex(x => x.id == testingWordId);
        wordsArr[index].word = word;
        wordsArr[index].translation  = translation;
        wordsArr[index].example = example;
      }

      progressBarFinnish();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('smth happened during update.php');
      setTimeout(() => { $('#bottom-logos').show(); $('#bottom-error').hide();}, 10000);
      updateInTest();
    },
  });

  setCaretToEnd($('#word-textarea'));
}

$('#hint-btn').on('click', () => hint())

function hint() {
  const index = wordsArr.findIndex(x => x.id == testingWordId);
  const el = isWordTesting ? $('#word-textarea') : $('#tranalstion-textarea');
  const text = isWordTesting ? wordsArr[index].word : wordsArr[index].translation;
  const numOfLettersProvided = el.val().trim().length;

  if (numOfLettersProvided == 0 && text.length - numOfLettersProvided > 0) {
    el.val(text.slice(0, 1));
    setCaretToEnd(el);
  }
  else if (numOfLettersProvided == 1 && text.length - numOfLettersProvided > 0) {
    el.val(text.slice(0, 2));
    setCaretToEnd(el);
  }
  else if (numOfLettersProvided == 2 && text.length - numOfLettersProvided > 0) {
    el.val(text.slice(0, 3));
    setCaretToEnd(el);
    $('#hint-box').hide();
  }
  else {
    el.val(text.slice(0, 1));
    setCaretToEnd(el);
  }
}

// constant checking answer on typing in Test
$('#word-textarea').on('input', function () {
  if ($('#check-box').is(':visible') && isWordTesting) {
    const index = wordsArr.findIndex(x => x.id == testingWordId);
    const text = wordsArr[index].word;
    // answer is correct
    if ($(this).val().toUpperCase().trim() == text.toUpperCase().trim()) check();
  }
});

// constant checking answer on typing  in Test
$('#tranalstion-textarea').on('input', function () {
  if ($('#check-box').is(':visible') && !isWordTesting) {
    const index = wordsArr.findIndex(x => x.id == testingWordId);
    const text = wordsArr[index].translation;
    // answer is correct
    if ($(this).val().toUpperCase().trim() == text.toUpperCase().trim()) check();
  }
});

// **************** test pre-sets ****************

$('#filter-on-display-btn').on('click', () => menuOff())

function lastTestSettings() {
  //https://jsfiddle.net/sherbsherb/0vrda8nj/49/
  let dfrd = $.Deferred();

  $.ajax({
    url: '/phps/load_settings.php',
    data: {
      Table: tbl,
    },
    dataType: 'text',
    async: true,
    type: 'POST',
    success: function (text) {
      if (text == false) {
        return;
      }
      else {
        const obj = $.parseJSON(text);
        $('#input1').val(obj.input1);
        $('#input2').val(obj.input2);
        $('#input3').val(obj.input3);
        $('#input4').val(obj.input4);
        $('#input5').val(obj.input5);
        $('#input6').val(obj.input6);
        $('#input7').val(obj.input7);
        $('#input8').val(obj.input8);
        $('#input9').val(obj.input9);
        $('#input10').val(obj.input10);
        $('#input11').val(obj.input11);
        $('#input12').val(obj.input12);
        $('#input13').val(obj.input13);
        $('#input14').val(obj.input14);
        $('#input15').val(obj.input15);
        $('.arrow').removeClass('red-color');
        $('.arrow').eq(obj.indexOfRedArrow).addClass('red-color');
      }

      dfrd.resolve();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('load_settings.php');
      setTimeout(() => {$('#bottom-logos').show();$('#bottom-error').hide();}, 10000);
      dfrd.resolve();
    },
  });

  return dfrd.promise();
}

$('#filter-prev-btn').on('click', async function() {
  //sort vocab depend on presets
  $("[id*='input']").val('');
  $('.arrow').removeClass('red-color');
  $(':focus').blur(); // to remove red borders from selected input
  if ($('#logged-box').is(':hidden')) { alert('Works only for registered users'); return; }
  setTimeout(() => menuOff(), 300);
  await lastTestSettings();
  displayWordsFromArr();
})

$('#filter-tested-lately-btn').on('click', () => {
  $("[id*='input']").val('');
  $(':focus').blur();

  $('.arrow').removeClass('red-color');
  $('#arrow18').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

$('#filter-never-tested-btn').on('click', () => {
  $("[id*='input']").val('');
  $('.arrow').removeClass('red-color');
  $(':focus').blur();
  $('#input14').val('0');
  displayWordsFromArr();
  setTimeout(() => menuOff(), 300);
})

$('#filter-new-btn').on('click', () => {
  $("[id*='input']").val('');
  $(':focus').blur(); // to remove red borders from selected input

  $('.arrow').removeClass('red-color');
  $('#arrow10').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

$('#filter-old-btn').on('click', () => {
  $("[id*='input']").val('');
  $(':focus').blur();

  $('.arrow').removeClass('red-color');
  $('#arrow9').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

$('#filter-hard-btn').on('click', () =>{
  $("[id*='input']").val('');
  $(':focus').blur();

  $('.arrow').removeClass('red-color');
  $('#arrow14').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

$('#filter-simple-btn').on('click', () => {
  $("[id*='input']").val('');
  $(':focus').blur();

  $('.arrow').removeClass('red-color');
  $('#arrow12').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

$('#filter-not-learnt-btn').on('click', () => {
  $("[id*='input']").val('');
  $('.arrow').removeClass('red-color');
  $(':focus').blur();
  $('#input11').val(1);
  displayWordsFromArr();
  setTimeout(() => menuOff(), 300);
})

$('#filter-learnt-btn').on('click', () => {
  $("[id*='input']").val('');
  $(':focus').blur();
  $('#input12').val(0);

  $('.arrow').removeClass('red-color');
  $('#arrow17').addClass('red-color');
  displayWordsFromArr();

  setTimeout(() => menuOff(), 300);
})

// **************** button under test ****************

$('#direct-test-btn, #reverse-test-btn, #combo-test-btn').on('click', () => testModeOnOff())

function testModeOnOff() {
  if ($('#direct-test-btn').is(':visible')) {
    $('#direct-test-btn').hide();
    $('#reverse-test-btn').show();
  }
  else if ($('#reverse-test-btn').is(':visible')) {
    $('#reverse-test-btn').hide();
    $('#combo-test-btn').show();
  }
  else {
    $('#combo-test-btn').hide();
    $('#direct-test-btn').show();
  }

  if (isTest) {
    (isWordTesting) ? $('#word-textarea').focus() : $('#tranalstion-textarea').focus();
  }
}

$('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').on('click', () => spokenOnOff())

function spokenOnOff() {
  if ($('#sound-word-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-off-btn').show();
  }
  else if ($('#sound-off-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-word-translation-btn').show();
  }
  else if ($('#sound-word-translation-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-word-example-btn').show();
  }
  else if ($('#sound-word-example-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-example-btn').show();
  }
  else if ($('#sound-example-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-word-translation-example-btn').show();
  }
  else if ($('#sound-word-translation-example-btn').is(':visible')) {
    $('#sound-word-btn, #sound-off-btn, #sound-word-translation-btn, #sound-word-example-btn, #sound-example-btn, #sound-word-translation-example-btn').hide();
    $('#sound-word-btn').show();
  }

  if (isTest) {
    (isWordTesting) ? $('#word-textarea').focus() : $('#tranalstion-textarea').focus();
  }
}

$('#sound-endless-on-btn, #sound-endless-off-btn').on('click', () => endlessTestOnOff())

function endlessTestOnOff() {
  if ($('#sound-endless-on-btn').is(':visible')) {
    $('#sound-endless-on-btn').hide();
    $('#sound-endless-off-btn').show();
  }
  else {
    $('#sound-endless-on-btn').show();
    $('#sound-endless-off-btn').hide();
  }
}

// **************** sound ****************

function playSound(SpeechText1 = '', Lang1 = '', SpeechText2 = '', Lang2 = '', SpeechText3 = '', Lang3 = '') {
  let dfrd = $.Deferred();

  $.when(getSoundLink(SpeechText1, Lang1, SpeechText2, Lang2, SpeechText3, Lang3)).then(function (status) {
    if (status) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = status;
      audio.play();
      audio.onended = () => {
        $('.play-pic').show().removeClass('playing');
        $('#test-settings-box > *').removeClass('playing');
        dfrd.resolve(status);
      };
    }
  });

  return dfrd.promise();
}

async function getSoundLink(SpeechText1 = '', Lang1 = '', SpeechText2 = '', Lang2 = '', SpeechText3 = '', Lang3 = '') {
  let dfrd = $.Deferred();

  $.ajax({
    url: '/phps/get_speech_link_2.php',
    data: {
      SpeechText1: SpeechText1,
      Lang1: Lang1,
      SpeechText2: SpeechText2,
      Lang2: Lang2,
      SpeechText3: SpeechText3,
      Lang3: Lang3,
    },
    dataType: 'text',
    async: true, //false = waits until script is finnished
    type: 'POST',
    cache: false,
    success: function (text) {
      dfrd.resolve(text);
      linksArr.push(text.replace('/speech/', ''));
      //addToCache(path);
    }
  });

  return dfrd.promise();
}

function playBtnClick(textEl, playPicEl, langEl, dwnldEl) {
  textEl.focus();

  if (!textEl.val()) {
    shake(textEl);
    return;
  }

  $('.dwnld').hide();
  $('.play-pic').removeClass('playing').show();
  playPicEl.addClass('playing');

  $.when(playSound(textEl.val(), langEl.val())).then(function (link) {
    playPicEl.removeClass('playing').hide();
    dwnldEl.attr('href', link).show();
    setTimeout(() => { dwnldEl.hide(); playPicEl.show(); }, 4000);
  });
}

$('#play-word-btn').on('click', function () { playBtnClick($('#word-textarea'), $('#play-word-btn'), $('#sound-word-select'), $('#download-word-btn')) });
$('#play-translation-btn').on('click', function () { playBtnClick($('#tranalstion-textarea'), $('#play-translation-btn'), $('#sound-translation-select'), $('#download-translation-btn')) });
$('#play-example-btn').on('click', function () { playBtnClick($('#example-textarea'), $('#play-example-btn'), $('#sound-example-select'), $('#download-example-btn')) });

// ones clicked we load 1s silent mp3 and then we could use audio programmatically and safari will not throw errors
$(document).one('touchstart click', () => {
  audio.src = '01s.mp3';
  audio.play;
});

$('#download-audio-files-btn').on('click', () => downloadAudio());

function downloadAudio() {
  uniq = [...new Set(linksArr)];
  let jsonString = JSON.stringify(uniq);

  $.ajax({
    type: 'POST',
    url: '/phps/zip.php',
    data: { data: jsonString },
    cache: false,
    success: function (data) {
      let link = document.createElement('a');
      link.download = 'Speech files';
      link.href = data;
      link.click();
    },
  });
}

// **************** user activity stamp ****************

function stampForLoggedUser() {
  if (isCookie('Friend')) {
    $.ajax({
      type: 'POST',
      url: '/phps/date_stamp_for_active_user.php',
      data: {
        table: cookieVal('Friend'),
      },
    });
  }
}

async function loggedToday() {
    let url = '/phps/users_per_day.php';
    let formData = new FormData();
    formData.append('id', timeNow().slice(0, 10) + '-' + tbl);
    formData.append('tbl', tbl);
    formData.append('dateNow', timeNow().slice(0, 10));
    let request = new Request(url, {method: 'POST', body: formData,});
    let response = await fetch(request);
    let result = await response.text();
    //console.log(result);
}

$(document).on('click', () => {
  if (!isCookie('DateStamp')) {
    setCookie('DateStamp', 666, 5 / 60 / 24); // 5 min
    stampForLoggedUser();
    loggedToday();
  }
});

// **************** translate ****************

let сlickedEl, сlickedElBefore;

document.addEventListener('focus', (e) => {
  сlickedElBefore = сlickedEl;
  сlickedEl = e.target;
}, true);

$('#translate-btn').on('click', () => lookUp())

function lookUp() {
  //delay to define сlickedElBefore.id before this function is fired
  setTimeout(() => {
    // nothing to translate
    if (!$('#tranalstion-textarea').val().trim() && !$('#word-textarea').val().trim()) {
      shake($('#tranalstion-textarea, #word-textarea, #translate-box'))
    }
    // only word is typed
    else if ($('#word-textarea').val().trim() && !$('#tranalstion-textarea').val().trim()) {
      lookUpWithGoogle($('#word-textarea'), $('#tranalstion-textarea'), $('#translate-lang-word-select'), $('#translate-lang-translation-select'));
    }
    // only translation is typed
    else if ($('#tranalstion-textarea').val().trim() && !$('#word-textarea').val().trim()) {
      lookUpWithGoogle($('#tranalstion-textarea'), $('#word-textarea'),  $('#translate-lang-translation-select'), $('#translate-lang-word-select'));
    }

    else if (document.activeElement.id == 'word-textarea') {
      lookUpWithGoogle($('#word-textarea'), $('#tranalstion-textarea'), $('#translate-lang-word-select'), $('#translate-lang-translation-select'));
    }
    else if (document.activeElement.id == 'tranalstion-textarea') {
      lookUpWithGoogle($('#tranalstion-textarea'), $('#word-textarea'),  $('#translate-lang-translation-select'), $('#translate-lang-word-select'));
    }
    else if (сlickedElBefore.id == 'word-textarea') {
      lookUpWithGoogle($('#word-textarea'), $('#tranalstion-textarea'), $('#translate-lang-word-select'), $('#translate-lang-translation-select'));
    }
    else if (сlickedElBefore.id == 'tranalstion-textarea') {
      lookUpWithGoogle($('#tranalstion-textarea'), $('#word-textarea'),  $('#translate-lang-translation-select'), $('#translate-lang-word-select'));
    }
    else if ($('#tranalstion-textarea').val().trim() && $('#word-textarea').val().trim()) {
      lookUpWithGoogle($('#word-textarea'), $('#tranalstion-textarea'), $('#translate-lang-word-select'), $('#translate-lang-translation-select'));
    }
  }, 150);
}

function lookUpWithGoogle(fromEl, toEl, langFromEl, langToEl) {
  $.ajax({
    type: 'POST',
    url: '/phps/google_translate.php',
    data: {
      Word: fromEl.val(),
      LangFrom: langFromEl.val(),
      LangTo: langToEl.val(),
    },
    success: function (data) {
      if (fromEl.val().trim() == data.trim()) {
        alert('Check language OR spelling');
        shake(langFromEl.add(langToEl));
      } else {
        toEl.focus().val(data).addClass('green');
        setTimeout(() => toEl.removeClass('green'), 1000);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('google_translate.php');
      setTimeout(() => { $('#bottom-logos').show(); $('#bottom-error').hide(); }, 10000);
      toEl.val('some error');
    },
  });
}

// **************** shake ****************

function shake (el) {
  el.addClass('shake');
  setTimeout(() => el.removeClass('shake'), 1000);
}

// **************** blink fn ****************

function blink(el) {
  el.fadeOut(100).fadeIn(100);
}

// **************** scroll down in TextAreas ****************

function scrollDownAllTxtAreas() {
  $('#word-textarea').scrollTop($('#word-textarea').innerHeight());
  $('#tranalstion-textarea').scrollTop($('#tranalstion-textarea').innerHeight());
  $('#example-textarea').scrollTop($('#example-textarea').innerHeight());
}

// **************** check translation on word typing ****************

// encapsulate inside self executed fn to locolize vars
(function() {
  let foundInVocab = false;
  let wordPrev, translationPrev, examplePrev, categoryPrev, displayedWordId;

  $('#word-textarea').on('input', function () {
    if ($('#translate-box').is(':visible')) {
      const val = $(this).val().toLowerCase().trim();
      const filteredDB = wordsArr.filter(x => x.word.toLowerCase() == val);
      if (!foundInVocab) {
        if (filteredDB.length) {
          wordPrev = $('#word-textarea').val();
          translationPrev = $('#tranalstion-textarea').val();
          examplePrev = $('#example-textarea').val();
          categoryPrev = $('#category-textarea').val();
          displayedWordId = filteredDB[0].id;

          $('textarea').addClass('grey');
          $('#tranalstion-textarea').val(filteredDB[0].translation);
          $('#example-textarea').val(filteredDB[0].example);
          $('#category-textarea').val(filteredDB[0].category);
          scrollDownAllTxtAreas();
          foundInVocab = true;
          $('#update-from-textarea-box').show();
          $('#start-test-box').hide();
        }
      }
      else {
        // found again, maybe pasted on top of founded word
        if (filteredDB.length) {
          displayedWordId = filteredDB[0].id;

          $('textarea').addClass('grey');
          $('#tranalstion-textarea').val(filteredDB[0].translation);
          $('#example-textarea').val(filteredDB[0].example);
          $('#category-textarea').val(filteredDB[0].category);
          scrollDownAllTxtAreas();
          foundInVocab = true;
          $('#update-from-textarea-box').show();
          $('#start-test-box').hide();
        }

        // match not found, put back saved items

        $('textarea').removeClass('grey');
        $('#tranalstion-textarea').val(translationPrev);
        $('#example-textarea').val(examplePrev);
        $('#category-textarea').val(categoryPrev);
        $('#update-from-textarea-box').hide();
        $('#start-test-box').show();
        scrollDownAllTxtAreas();
        foundInVocab = false;
      }
    }
  });

  $('#update-from-textarea-btn').on('click', () => updateFromTxtArea())

  function updateFromTxtArea() {
    if ($('#word-textarea').val().replace(/\n/g, '') == '') {
      $('#word-textarea').focus();
      return;
    }

    const word = cleanText($('#word-textarea').val());
    const translation = cleanText($('#tranalstion-textarea').val());
    const example = cleanText($('#example-textarea').val());
    const category = cleanText($('#category-textarea').val());
    const time = timeNow();

    $.ajax({
      type: 'POST',
      url: '/phps/update_word.php',
      data: {
        Word: word,
        Translation: translation,
        Example: example,
        Category: category,
        Added: time,
        ID: displayedWordId,
        Table: tbl,
        isLoggedUser: isLoggedUser,
      },
      success: function (data) {
        if (data == "Updated") {
          // find index in array
          const index = wordsArr.findIndex(x => x.id == displayedWordId);
          // modify change object in array
          wordsArr[index].word = word;
          wordsArr[index].translation = translation;
          wordsArr[index].example = example;
          wordsArr[index].category = category;
          wordsArr[index].added = time;

          $('.arrow').removeClass('red-color');
          $('#arrow10').addClass('red-color');
          displayWordsFromArr();

        }
        else {
          $('#bottom-logos').hide();
          $('#bottom-error').show().text('smth happened during update_word.php');
          setTimeout(() => { $('#bottom-logos').show(); $('#bottom-error').hide(); }, 10000);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#bottom-logos').hide();
        $('#bottom-error').show().text('smth happened during update_word.php');
        setTimeout(() => {$('#bottom-logos').show(); $('#bottom-error').hide(); }, 10000);
        updateFromTxtArea();
      },
    });

    setCaretToEnd($('#word-textarea'));
  }

})();

// **************** in table ****************

// updated word on input
(function() {
  let tdText;

  $(document).
    on('focusin', '#tbl tr td:nth-child(n+2):nth-child(-n+5)', function (e) {
      tdText = $(this).text().trim();
    }).
    on('focusout', '#tbl tr td:nth-child(n+2):nth-child(-n+5)', function (e) {
      // if no changes were made do nothing
      if (tdText == $(this).text().trim()) return;

      // clean formatting
      $(this).html(cleanText($(this).text().trim()));

      progressBarStart();
      const td = $(this);
      const tr = td.parent();
      const word = cleanText(tr.children().eq(1).text());
      const translation = cleanText(tr.children().eq(2).text());
      const example = cleanText(tr.children().eq(3).text());
      const category = cleanText(tr.children().eq(4).text());
      const added = timeNow();
      const id = tr.children().eq(11).text();
      tr.children().eq(5).html(added);

      $.post(
        '/phps/update_word.php',
        {
          Word: word,
          Translation: translation,
          Example: example,
          Category: category,
          Added: added,
          ID: id,
          Table: tbl,
          isLoggedUser: isLoggedUser,
        },
        function (data) {
          $('#bottom-logos').show();
          $('#bottom-loading').hide();

          // find index in array
          const index = wordsArr.findIndex(x => x.id == id);
          // modify change object in array
          wordsArr[index].word = word;
          wordsArr[index].translation = translation;
          wordsArr[index].example = example;
          wordsArr[index].category = category;
          wordsArr[index].added = added;
          progressBarFinnish();
        }
      );
    })
})();

// delete line
$(document).on('click', '#tbl tbody tr td:nth-child(11) div', function (e) {
  const trEl = $(this).closest('tr');
  const id = $(this).closest('td').siblings().last().text();

  $.post(
    '/phps/delete_row.php',
    {
      Word: trEl.children().eq(1).text() ,
      Translation: trEl.children().eq(2).text(),
      Example: trEl.children().eq(3).text(),
      Category: trEl.children().eq(4).text(),
      Deleted: timeNow(),
      Passed: trEl.children().eq(6).text(),
      Failed: trEl.children().eq(7).text(),
      Difficulty: trEl.children().eq(8).children().first().data('my-dif'),
      Tested: trEl.children().eq(9).html(),
      ID: id,
      Owner: tbl,
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    function (data) {
      trEl.remove();
      // delete from array
      const index = wordsArr.findIndex(x => x.id == id);
      wordsArr.splice(index, 1);
      $('#words-num-in-test').text($('#tbl tbody tr').length);
      $('#undo-btn').show();
      setTimeout(() => blink($('#undo-btn')), 600);
    }
  );
});

// undo
$('#undo-btn').on('click', function () {
  $.post(
    '/phps/undo.php',
    {
      Table: tbl,
      isLoggedUser: isLoggedUser,
      Owner: tbl,
      Now: timeNow(),
    },
    function (data) {
      const returnedArr = $.parseJSON(data);
      if (returnedArr.length) {
        const returnedObj = returnedArr[0];
        const newRow = {
          added: timeNow(),
          category: returnedObj.category,
          difficulty: +returnedObj.difficulty,
          example: returnedObj.example,
          failed: +returnedObj.failed,
          id: returnedObj.id,
          passed: +returnedObj.passed,
          tested: returnedObj.tested,
          translation: returnedObj.translation,
          word: returnedObj.word,
        }
        wordsArr.push(newRow);

        $('.arrow').removeClass('red-color');
        $('#arrow10').addClass('red-color');
        displayWordsFromArr();
      }
      // no more deleted words in db
      else {
        $('#undo-btn').hide();
        alert("no more items to restore!");
      }
    }
  );
});

// **************** difficulty ball ****************

$(document).on('click', '.dif_range > span', function (e) {
  $('#bottom-logos').hide();
  $('#bottom-loading').show();
  const row = this.parentNode.parentNode.parentNode.rowIndex;
  $(this).parent().children().each(function (x) {$(this).addClass('dif' + x);});
  const Clicked_Index = $(this).parent().children().index(this);
  $(this).nextAll().each(function (x) {$(this).removeClass('dif' + (Clicked_Index + x + 1));});

  const id = $('#tbl tr:eq(' + row + ') td:eq(11)').text();

  $.post(
    '/phps/update_difficulty.php',
    {
      Difficulty: Clicked_Index,
      ID: id,
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    function (data) {
      // find index in array
      const index = wordsArr.findIndex(x => x.id == id);
      // modify change object in array
      wordsArr[index].difficulty = Clicked_Index;
      $('#bottom-logos').show();
      $('#bottom-loading').hide();
    }
  );

  $(this).parent().attr('data-my-dif', Clicked_Index); //set custom atribute
});

// **************** checkboxes count and selection ****************

let lastChecked = null;

// select checkboxes with shift
$(document).on('click', '.chkbx', function (e) {
  if (!lastChecked) lastChecked = this;

  if (e.shiftKey) {
    let start = $('.chkbx').index(this);
    let end = $('.chkbx').index(lastChecked);
    $('.chkbx').slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', lastChecked.checked);
  }

  lastChecked = this;

  // show number of checked words
  if ($('.chkbx:checked').length) {
    $('#words-num-in-test').text($('.chkbx:checked').length);
  }
  else {
    $('#words-num-in-test').text($('#tbl tbody tr').length );
  }
});

// select all checkboxes
$('#select-all-checkbox').on('click', function () {
  if ($('#select-all-checkbox').is(':checked')) {
    $('.chkbx').prop('checked', true);
    $('#words-num-in-test').text($('.chkbx:checked').length);
  }
  else {
    $('.chkbx').prop('checked', false);
    $('#words-num-in-test').text($('#tbl tbody tr').length );
  }
});

// **************** some event listenders ****************

$(window).on('resize', () => {
  isMobile = ($(window).width() < 500) ? true : false;
})

//move input box right and left, show more words when reach the bottom, remove focuse from input15 to avoid sreen jumps

jQuery(function($){

  let timeoutLeftRight, timeoutMoreWords;
  $(window).on('scroll', function (e) {

    // move textareas horizontally
    if (timeoutLeftRight) clearTimeout(timeoutLeftRight);
    timeoutLeftRight = setTimeout(() => $('#fixed-horizontally').css({ left: $(this).scrollLeft() }), 100);

    // to remove phone keyboard when we scroll in the list of findings to avoid misclick at not visible part of the list, for some reason list jumps if input is focused
    if (isMobile && $('.menu').is(':visible') && $('#input15').is(':focus')) $('#input15').blur();

    // add new words on bottom reach
    let screenDif = $(document).height() - window.innerHeight - $(window).scrollTop(); // innerHeight take care of url pane on mobile which disapears when scrolling
    if (timeoutMoreWords) clearTimeout(timeoutMoreWords);
    timeoutMoreWords = setTimeout(() => {
      if (screenDif < 5 && +document.documentElement.scrollHeight > 2400 && !isTest && $('#bottom-loading').is(':hidden')) {
        const totalWordsNum = $('tbody tr').length;
        displayWordsFromArr(true);
      }
    }, 100);
  });

});





$(document).on('keydown', function (e) {
  // prevent default actions for ENTER and TAB, like a new line
  if (e.key == 'Enter' || e.key == 'Tab') e.preventDefault();
  // ESC
  if (e.key == 'Escape') menuOff();
});

$(document).on('keydown', function (e) {
  // slide in .menu with keys, up, down, enter, esc
  if ((e.keyCode == 40 || e.keyCode == 38 || e.key == 'Enter' || e.key == 'Escape') && $('.menu').is(':visible')) {
    e.preventDefault(); e.stopPropagation();
    const menu = $('.menu');
    // UP or DOWN
    if (e.keyCode == 40 || e.keyCode == 38) {
      // DOWN
      if (e.keyCode == 40) {
        downKey = downKey + 1;
        if (downKey > menu.children().length - 1) downKey = 0;
      }
      // UP
      else {
        downKey = downKey - 1;
        if (downKey < 0) downKey = menu.children().length - 1;
      }
      menu.children().removeClass('downKeyHighlight');
      menu.children().eq(downKey).addClass('downKeyHighlight');
    }
    // ENTER
    else if (e.key == 'Enter') {
      if (downKey != -1) menu.children().eq(downKey).click();
    }
    //ESC
    else if (e.key == 'Escape') {
      menuOff();
    }
  }
  // Ctrl+F
  else if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
    e.preventDefault();
    k = $('#input15').val();
    if (!isTest) $("[id*='input']").val('');
    $('#input15').val(k).focus().select();
  }
  //translate: Shift + Enter
  else if (e.key == 'Enter' && (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)) {
    e.preventDefault();
    blink($('#TranslateButtonShortcut'));
    $('#translate-btn').addClass('button_hovered');
    setTimeout(() => $('#translate-btn').removeClass('button_hovered'), 800);
    $('#word-textarea').val(cleanText($('#word-textarea').val()));
    $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));
    lookUp();
  }
  // ENTER show next Word or Translation (in test)
  else if ($('#next-box').is(':visible') && e.key == 'Enter') {
    e.preventDefault();
    next();
    blink($('#next-shortcut, #check-shortcut'));
  }
  //ENTER jump to Word if nowhere
  else if (!$('textarea').is(':focus') && !$('input').is(':focus') && e.key == 'Enter') {
  //else if (!$('textarea').is(':focus') && !$('input').is(':focus') && !justClosedPopUp && e.key == 'Enter') {
    e.preventDefault();
    if (isWordTesting ) {
      setCaretToEnd($('#word-textarea'));
    } else {
      setCaretToEnd($('#tranalstion-textarea'));
    }
  }
  // TAB, jump to Word if nowhere
  else if (!$('textarea').is(':focus') && e.key == 'Tab') {
    e.preventDefault();
    setCaretToEnd($('#word-textarea'));
  }
  // show hint
  else if (e.keyCode == 72 && (e.metaKey || e.ctrlKey || e.altKey)) {
    e.stopPropagation(); e.preventDefault();
    if ($('#hint-box').is(':visible')) {
      blink($('#hint-shortcut'));
      hint();
    }
  }
  // accept answer with Ctrl+A
  else if (e.keyCode == 65 && (e.metaKey || e.ctrlKey || e.altKey) && $('.ctrl-a').is(':visible')) {
    e.stopPropagation(); e.preventDefault();
    blink($('.ctrl-a'));
    acceptAnswer();
  }
  // update answer with Ctrl+U
  else if (e.keyCode == 85 && (e.metaKey || e.ctrlKey || e.altKey) && $('#update-from-test-btn').is(':visible')) {
    e.stopPropagation(); e.preventDefault();
    blink($('#update-from-test-shortcut'));
    updateInTest();
  }
});

$(document).on('keyup', () => keyNum = 0);


// **************** for android with Gboard ****************

// keyCode on android is always 229 whatever we press on virtual keyboard
// https://stackoverflow.com/questions/36753548/keycode-on-android-is-always-229/42552368#42552368
// that is why can not detect Enter
// that is due to google soft keyboard with autocomplete predition on Gboard keyboard
// Enter hit accepts an autocompletion making the new line and then real keyCode can be read
// for this particular reason here is the workaround to detect Enter, which produces line break
// check the number of line breaks, if it is not 0, most likely Enter was hit

$('#word-textarea').on('input keydown', function (e) {
  // https://stackoverflow.com/questions/10950538/how-to-detect-line-breaks-in-a-text-area-input/31999295
  const lineBreakesNum = ($(this).val().match(/\n/g)||[]).length;

  if (lineBreakesNum && isAndroid()) {
    // check Word (in test)
    if (isTest && $('#check-box').is(':visible') && isWordTesting) {
      blink($('#add-shortcut'));
      $('#word-textarea').val(cleanText($('#word-textarea').val()));
      check();
    }
    // show next Word (in test)
    else if (isTest && $('#next-box').is(':visible')) {
      blink($('#next-shortcut, #check-shortcut'));
      next();
    }
    // jump from Word to Translation (not in test)
    else if (!isTest) {
      blink($('#add-shortcut'));
      $('#word-textarea').val(cleanText($('#word-textarea').val()));
      setCaretToEnd($('#tranalstion-textarea'));
    }
  }
})

$('#tranalstion-textarea').on('input keydown', function (e) {
  // https://stackoverflow.com/questions/10950538/how-to-detect-line-breaks-in-a-text-area-input/31999295
  const lineBreakesNum = ($(this).val().match(/\n/g)||[]).length;

  if (lineBreakesNum && isAndroid()) {
    // check Word (in test)
    if (isTest && $('#check-box').is(':visible') && isWordTesting) {
      blink($('#add-shortcut'));
      $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));
      check();
    }
    // show next Word (in test)
    else if (isTest && $('#next-box').is(':visible')) {
      blink($('#next-shortcut, #check-shortcut'));
      next();
    }
    // jump to Example or add a word (not in test)
    else if (!isTest) {
      blink($('#add-shortcut'));
      $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));
      if ($('#example-box').is(':hidden')) {
        if ($('#category-box').is(':hidden')) {
          add();
        }
        else {
          $('#category-textarea').focus().select();
        }
      }
      else {
        setCaretToEnd($('#example-textarea'));
      }
    }
  }
})

$('#example-textarea').on('input keydown', function (e) {
  // https://stackoverflow.com/questions/10950538/how-to-detect-line-breaks-in-a-text-area-input/31999295
  const lineBreakesNum = ($(this).val().match(/\n/g)||[]).length;

  if (lineBreakesNum && isAndroid()) {
    // jump from Example to Translation if we test Translation (in Test)
    if (isTest && !$('#next-box').is(':visible') && !isWordTesting) {
      blink($('#add-shortcut'));
      $('#tranalstion-textarea').focus();
    }
    // jump from Example to Word if we test Word (in Test)
    else if (isTest && !$('#next-box').is(':visible') && isWordTesting) {
      blink($('#add-shortcut'));
      $('#word-textarea').focus();
    }
    // show next Word (in test)
    else if (isTest && $('#next-box').is(':visible')) {
      blink($('#next-shortcut, #check-shortcut'));
      next();
    }
    // jump from Example to Category (not in Test)
    else if (!isTest) {
      blink($('#add-shortcut'));
      $('#example-textarea').val(cleanText($('#example-textarea').val()));
      if ($('#category-box').is(':hidden')) {
        add();
      }
      else {
        $('#category-textarea').focus().select();
      }
    }
  }
})

$('#category-textarea').on('input keydown', function (e) {
  // https://stackoverflow.com/questions/10950538/how-to-detect-line-breaks-in-a-text-area-input/31999295
  const lineBreakesNum = ($(this).val().match(/\n/g)||[]).length;

  if (lineBreakesNum && isAndroid()) {
    // add Word after Category (not in Test)
    blink($('#add-shortcut'));
    $('#category-textarea').val(cleanText($('#category-textarea').val()));
    add();
    $('#add-btn').addClass('button_hovered');
    setTimeout(() => $('#add-btn').removeClass('button_hovered'), 800);
  }
})




$('#word-textarea').on('keydown', function (e) {
  // we have listener for Shift+Enter on document,
  // but on Word we listen for just Enter, it triggers
  // For Shift + Enter keyNum is > 1 depending on how long we press Shift,
  // thus when we check keyNum == 1 we know that we just hit Enter alone
  keyNum = keyNum + 1;

  // check Word with Enter (in test)
  if ($('#check-box').is(':visible') && isWordTesting && e.key == 'Enter') {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#word-textarea').val(cleanText($('#word-textarea').val()));
    check();
  }
  // jump from Word to Translation with Enter (not in test)
  else if (!isTest && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#word-textarea').val(cleanText($('#word-textarea').val()));
    setCaretToEnd($('#tranalstion-textarea'));
  }
  // jump from Word to Translation if we test Translation (in test)
  else if (isTest && !$('#next-box').is(':visible') && !isWordTesting && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#tranalstion-textarea').focus();
  }
  // jump to translation with TAB
  else if (e.key == 'Tab') {
    e.stopPropagation(); e.preventDefault();
    $('#word-textarea').val(cleanText($('#word-textarea').val()));
    setCaretToEnd($('#tranalstion-textarea'));
  }
})

$('#tranalstion-textarea').on('keydown', function (e) {
  // ENTER
  keyNum = keyNum + 1;

  // check Translation with Enter (in test)
  if ($('#check-box').is(':visible') && !isWordTesting && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));
    check();
  }
  // jump to Example or add a word (not in test)
  else if (!isTest && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));
    if ($('#example-box').is(':hidden')) {
      if ($('#category-box').is(':hidden')) {
        add();
      }
      else {
        $('#category-textarea').focus().select();
      }
    }
    else {
      setCaretToEnd($('#example-textarea'));
    }
  }
  // jump from Translation (Example) to Word if we test Word (in test)
  else if (isTest && !$('#next-box').is(':visible') && isWordTesting && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#word-textarea').focus();
  }
  // TAB
  else if (e.key == 'Tab') {
    e.stopPropagation(); e.preventDefault();
    $('#tranalstion-textarea').val(cleanText($('#tranalstion-textarea').val()));

    if ($('#example-box').is(':hidden')) {
      if ($('#category-box').is(':hidden')) {
        setCaretToEnd($('#word-textarea'));
      }
      else {
        $('#category-textarea').focus().select();
      }
    } else {
      setCaretToEnd($('#example-textarea'));
    }
  }
})

$('#example-textarea').on('keydown', function (e) {
  // ENTER
  keyNum = keyNum + 1;

  // jump from Example to Translation if we test Translation  (in Test)
  if (isTest && !$('#next-box').is(':visible') && !isWordTesting && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#tranalstion-textarea').focus();
  }
  // jump from Example to Word if we test Word  (in Test)
  else if (isTest && !$('#next-box').is(':visible') && isWordTesting && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#word-textarea').focus();
  }
  // jump from Example to Category (not in Test)
  else if (e.key == 'Enter' && !isTest && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#example-textarea').val(cleanText($('#example-textarea').val()));
    if ($('#category-box').is(':hidden')) {
      add();
    }
    else {
      $('#category-textarea').focus().select();
    }
  }
  // TAB
  else if (e.key == 'Tab') {
    e.stopPropagation(); e.preventDefault();
    $('#example-textarea').val(cleanText($('#example-textarea').val()));
    if ($('#category-box').is(':hidden')) {
      setCaretToEnd($('#word-textarea'));
    }
    else {
      $('#category-textarea').focus().select();
    }
  }
})

$('#category-textarea').on('keydown', function (e) {
  // ENTER
  keyNum = keyNum + 1;

  if (downKey != -1 && e.key == 'Enter') {
    // dropdown list is on & ENTER key is pressed
    e.stopPropagation(); e.preventDefault();
    $('.menu' + ' div:eq(' + downKey + ')').click();
  }
  // add Word after Category (not in Test)
  else if ($('#category-textarea').is(':focus') && e.key == 'Enter' && keyNum == 1) {
    e.stopPropagation(); e.preventDefault();
    blink($('#add-shortcut'));
    $('#category-textarea').val(cleanText($('#category-textarea').val()));
    add();
    $('#add-btn').addClass('button_hovered');
    setTimeout(() => $('#add-btn').removeClass('button_hovered'), 800);
  }
  // TAB
  else if (e.key == 'Tab') {
    e.stopPropagation(); e.preventDefault();
    setCaretToEnd($('#word-textarea'));
  }
});

// hide cursor on idle
// that is how we do not expose variables from the scope
// ACTION: do the same for other global vars if possible
$(function () {
  let timer;
  $(document).mousemove(() => {
    let els = $('body, textarea, button, #play-word-btn, #play-translation-btn, #play-example-btn, #typo-word-btn, #typo-translation-btn, #translate-lang-word-select, #translate-lang-translation-select, #sound-word-select, #sound-translation-select, #sound-example-select')
    els.removeClass('no-cursor');
    if (timer) clearTimeout(timer);
    timer = setTimeout(() =>  els.addClass('no-cursor'), 3000);
  });
});

// **************** buttons in corner ****************

$('#settings-btn').on('click', () => settingsWindow())

function settingsWindow() {

  if (isLoggedUser) {
    $('#pass-div').show();
  }
  else {
    $('#pass-div').hide();
  }

  $('#dimmed, #settings-menu').show();
  $('html,body').scrollTop(0).scrollLeft(0);
}

$('#bulk-category-btn').on('click', () => bulkCategory())

function bulkCategory() {
  const idArr = returnCheckedOrDisplayedIDsArr();
  const JSONarr = JSON.stringify(returnCheckedOrDisplayedIDsArr());
  if(!idArr.length) {alert('no checked or displayed words'); return;}
  const newCategory = $('#bulk-category').val().trim();

  $.ajax({
    type: 'POST',
    url: '/phps/bulk_category.php',
    data: {
      arr: JSONarr,
      BulkCategory: newCategory,
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    success: function (data) {
      $('#input4').val(newCategory);

      // change categories in wordsArr
      idArr.forEach((a) => {
        let index = wordsArr.findIndex(x => x.id == a);
        wordsArr[index].category = newCategory;
      });

      displayWordsFromArr();
      menuOff();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('bulk_category.php');
      setTimeout(() => {$('#bottom-logos').show();$('#bottom-error').hide();}, 10000);
    },
  });
}

$('#bulk-delete-btn').on('click', () => bulkDelete())

function bulkDelete() {
  const idArr = returnCheckedOrDisplayedIDsArr();
  const JSONarr = JSON.stringify(idArr);
  if(!idArr.length) {alert('no words on the screen'); return;}

  if (confirm('Are you sure to delete checked or displayed words?')) {

    $.ajax({
      type: 'POST',
      url: '/phps/bulk_delete.php',
      data: {
        arr: JSONarr,
        Table: tbl,
        isLoggedUser: isLoggedUser,
        Time: timeNow(),
      },
      success: function (data) {
        // change categories in wordsArr
        idArr.forEach((a) => {
          let index = wordsArr.findIndex(x => x.id == a);
          wordsArr.splice(index, 1);
        });

        displayWordsFromArr();
        menuOff();
        $('#undo-btn').show();
        setTimeout(() => blink($('#undo-btn')), 600);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#bottom-logos').hide();
        $('#bottom-error').show().text('bulk_delete.php');
        setTimeout(() => {$('#bottom-logos').show(); $('#bottom-error').hide();}, 10000);
      },
    });
  }
}

// **************** search inputs ****************

$('#search-btn').on('click', () => searchFourInputs())

function searchFourInputs() {
  if (!isTest) {
    if (!$('#input15').val().trim()) {
      shake($('#input15'));
    }
    else {
      // remove text from other inputs, sometimes due to other sorting the clicked word is not displayed
      // ACTION: maybe do it not only for phone
      if (isMobile) $("[id*='input']").not("#input15").val('');
      displayWordsFromArr();
      searchedRecently = true;
    }
  }
}

function resetInputs() {
  // clean all inputs
  if (!isTest) {
    $("[id*='input']").val('');
    shake($("[id*='input']"));
    $(':focus').blur();
    displayWordsFromArr();
    searchedRecently = false;
  }
}

$('#delete-btn').on('click', () => cleanInputs())

function cleanInputs() {
  if ($('#input15').val()) {
    $('#input15').val('').focus();
  }
  else if (isMobile && $('#input15').val() && $('#textareas-and-btns').is(':hidden')) {
    //$('#tbl').css({ 'margin-top': '0px' });
    $('#textareas-and-btns').show();
    if (searchedRecently) displayWordsFromArr();
  }
  else {
    $("[id*='input']").each(function () {
      const text_value = $(this).val();
      if (text_value) {
        resetInputs();
      }
      else {
        shake($("[id*='input']"));
      }
    });
  }
}

$("[id*='input']").on('keydown', function (e) {
  // dropdown list is on & ENTER key is pressed
  if (downKey != -1 && e.key == 'Enter') {
    e.stopPropagation(); e.preventDefault();
    $('.menu').children().eq(downKey).click();
  }
  // ESC - do not fire displayWords() but focusout to make input15 small
  else if (e.key == 'Escape') {
    e.preventDefault();
    if (!$(this).val() ) {
      // if we are in Input and there is nothing and pressed Enter, do nothing
      e.stopPropagation(); e.preventDefault();
      $(this).blur();
      $('.pop-up, #dimmed').hide();
    }
    else if ($(this).is('#input15') && $(this).val()) {
      $(this).val('');
    }
    else {
      $(this).val('');
      displayWordsFromArr();
    }
  }
  // ENTER
  else if (e.key == 'Enter') {
    e.stopPropagation(); e.preventDefault();
    if (!$(this).val()) {
      // if we are in Input and there is nothing and pressed Enter, do nothing
      $(':focus').blur();
    }
    else if ($(this).is('#input15')) {
      searchFourInputs();
      $(':focus').blur();
    }
    else {
      displayWordsFromArr();
      $(':focus').blur();
    }
  }
  // TAB
  else if (e.key == 'Tab') {
    e.stopPropagation(); e.preventDefault();
    if (+$(this).attr('id').replace('input', '') == 15) {
      $('#input1').focus();
      $('.pop-up, #dimmed').hide();
    }
    else {
      if ($("[id*='input']:visible").index(this) == $("[id*='input']:visible").length - 1) {
        $('#input15').focus();
      }
      else {
        $("[id*='input']:visible").eq($("[id*='input']:visible").index(this) + 1).focus();
        $('.pop-up, #dimmed').hide();
      }
    }
  }
});

// sort while typing
$("[id*='input']").not('#input15').on('input', () => displayWordsFromArr());

// search input field on phone
$('#input15')
  .focusin(function (e) {
    if (isMobile) {
      e.preventDefault();
      //$('#input15').blur();
      $('#textareas-and-btns').hide();
      $('html,body').scrollTop(0);
      //$('#input15').focus();
      setTimeout(() => $('html,body').scrollTop(0), 100);
    }
  })
  .focusout(function () {
    if (!$(this).val()) {
      $('#textareas-and-btns').show();

      if (searchedRecently) {
        displayWordsFromArr();
        searchedRecently = false;
      }
    }
  });

// **************** shared words ****************

$('#share-btn').on('click', async function() {
  $('#dimmed, #share-menu').show();
  $('html,body').scrollTop(0).scrollLeft(0);
  $('#share-link').text('Wait...');

  const idArr = returnCheckedOrDisplayedIDsArr();
  const JSONarr = JSON.stringify(idArr);
  const sharedTbl = timeNowForTable() + '_' + Math.floor(Math.random() * 100 + 1);

  let url = '/phps/share.php';
  let formData = new FormData();
  formData.append('arr', JSONarr);
  formData.append('OldTable', tbl);
  formData.append('NewTable', sharedTbl);
  formData.append('Table', tbl);
  formData.append('isLoggedUser', isLoggedUser);
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();

  $('#share-link').html('https://myvocab.org/?dict=' + result);

  // link is copied on phone only due to interaction, that is why assign it for click event
  $(document).one('click', async function() {
    try {
      await navigator.clipboard.writeText('https://myvocab.org/?dict=' + result);
      alert('copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  })
})

function returnCheckedOrDisplayedIDsArr() {
  let idArr = [];
  // if any checkbox is selected, get their ids
  if($('.chkbx:checked').length) {
    $('.chkbx:checked').each(function () {
      const id = $(this).closest('td').siblings().last().text();
      idArr.push(id);
    })
  }
  // get ids of all shown words
  else {
    $('#tbl tbody tr').each(function () {
      const id = $(this).children().last().text();
      idArr.push(id);
    })
  }
  return idArr;
}

function paramFromUrl(paramName) {
  const url_string = window.location.href;
  const url = new URL(url_string);
  return url.searchParams.get(paramName);
}

$('#show-words-btn').on('click', () => showWords()) //xxxxx

function showWords() {
  setCookie('Friend', 666, -666);
  setCookie('Stranger', timeNowForTable() + '-' + Math.floor(Math.random() * 100 + 1), 3);
  isLoggedUser = false;
  logoutVisualy();

  $.post(
    '/phps/shared_vocab_copy_to_strangers.php',
    {
      NewTable: cookieVal('Stranger'),
      OldTable: paramFromUrl('dict'),
      Added: timeNow(),
    },
    function (data) {
      //window.location.replace('https://myvocab.org/');
      manageCookiesAndVars();
      loadStrangerOrFirendTable();
      menuOff();
    }
  );
}

$('#add-words-btn').on('click', () => addWords())

function addWords() {
  isLoggedUser = isCookie('Friend') ? 1 : 0;
  const tbl = isCookie('Friend') ? cookieVal('Friend') : cookieVal('Stranger');

  $.post(
    '/phps/shared_vocab_copy_to_same.php',
    {
      NewTable: tbl,
      isLoggedUser: isLoggedUser,
      OldTable: paramFromUrl('dict'),
      Added: timeNow(),
    },
    function (data) {
      manageCookiesAndVars();
      loadStrangerOrFirendTable();
      menuOff();
      addAfterDomainInURL();
    }
  );
}

// **************** stat ****************

$('#stat-btn, #update-stat-btn').on('click', () => statWindow());

// max 365 days back
$('#past-days').on('focusout', function() {
  $(this).text(Math.min(+$(this).text(), 365));
});

async function statWindow() {
  await $.getScript('https://www.gstatic.com/charts/loader.js');
  // load the Visualization API and the corechart package
  await google.charts.load('current', { packages: ['corechart'] });

  let chartData = null;
  let chartOptions = null;
  let barChart = null;
  let barChartData = null;
  let barChartOptions = null;
  let dateArrNew = [];
  let checksArrNew = [];

  $('#dimmed, #stat-menu, #update-stat-loading').show();
  $('html,body').scrollTop(0).scrollLeft(0);

  // pie chart

  // set a callback to run when the Google Visualization API is loaded.
  // create the chartData table
  chartData = new google.visualization.DataTable();
  chartData.addColumn('string', 'Name');
  chartData.addColumn('number', 'Words');
  //chartData.addRows([['Learnt', 100],['In progress', 200]]);

  chartOptions = {
    width: 310,
    height: 200,
    chartArea: {width: '100%',height: '80%',},
    backgroundColor: 'transparent',
    pieSliceText: 'value',
    pieSliceTextStyle: {color: 'black',},
    legend: {position: 'bottom',textStyle: {color: 'white',},},
    slices: {0: { color: '#ff8888' }, 1: { color: '#91eb94' }, 2: { color: '#c4c4c4' },},
  };
  //chart.draw(chartData, chartOptions);

  // Instantiate and draw our chart, passing in some options.
  chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
  //chart.draw(chartData, chartOptions);

  $.ajax({
    type: 'POST',
    url: '/phps/total_stat_for_pie.php',
    data: {
      Table: tbl,
      isLoggedUser: isLoggedUser,
    },
    success: function (response) {
      let arr = $.parseJSON(response);
      $('#total-number').html(arr.total);
      chartData.addRows([
        ['In progress', +arr.in_progress],
        ['Learnt', +arr.learnt],
        ['Not started', +arr.not_started],
      ]);
      chart.draw(chartData, chartOptions);

      $('#update-stat-btn').show();
      $('#update-stat-loading').hide();
    }
  });


  // checks attemts bar graph
  dateArrNew = [];
  checksArrNew = [];


  // Create the chartData table.
  barChartData = new google.visualization.DataTable();
  barChartData.addColumn('string', 'Date');
  barChartData.addColumn('number', 'Attempts');
  barChartData.addColumn({ type: 'string', role: 'style' }); // user colors for bars

  barChartOptions = {};
  //chart.draw(chartData, chartOptions);

  // Instantiate and draw our chart, passing in some options.
  barChart = new google.visualization.ColumnChart(document.getElementById('col-chart'));
  //barChart.draw(barChartData, barChartOptions);

  $.ajax({
    type: 'POST',
    url: '/phps/date_checks_string.php',
    data: {
      table: tbl,
      DateNow: timeNow().slice(0, 10),
      ID: tbl + ' - ' + timeNow().slice(0, 10),
    },
    success: function (response) {
      // array of objects [{date: "2000.12.05", checks: "5"}]
      let arr = $.parseJSON(response);
      // get arrays of dates and checks
      let dateArr = arr.map((obj) => obj.date);
      let checksArr = arr.map((obj) => obj.checks);

      // put +$('#past-days').text() dates in dateArrNew
      let date = new Date();
      for (i = 0; i < +$('#past-days').text(); i++) {
        date.setDate(date.getDate() - i);
        dateArrNew[i] = dateFn(date);
        date = new Date();
      }

      // length of new arr
      const arrLen = dateArrNew.length;

      // find corresponding index of date and take checks with same index
      for (i = 0; i < arrLen; i++) {
        checksArrNew[i] = 0;
        const index = dateArr.findIndex(x => x == dateArrNew[i]);
        checksArrNew[i] = +checksArr[index];
      }

      checksArrNew.reverse();
      dateArrNew.reverse();

      for (i = 0; i < arrLen; i++) {
        dateArrNew[i] = dateArrNew[i].slice(5);
        dateArrNew[i] = dateArrNew[i].slice(3, 5) + '.' + dateArrNew[i].slice(0, 2);
      }

      for (i = 0; i < arrLen; i++) {
        barChartData.addRows([[dateArrNew[i], checksArrNew[i], 'opacity: 0.7']]);
      }

      barChartOptions = {
        colors: ['white'], width: 310, height: 150, chartArea: { top: 10, width: '80%', height: '60%' }, backgroundColor: 'transparent',
        legend: { position: 'none', textStyle: { color: 'white', }, },

        vAxis: {
          viewWindow: { max: Math.max(...checksArrNew), },
          textStyle: { color: 'white', },
          gridlines: { color: '', },
        },

        hAxis: {
          textStyle: { color: 'white', },
          gridlines: { color: 'white', },
          baselineColor: 'white',
        },
      };

      barChart.draw(barChartData, barChartOptions);
    }
  });

}

// **************** save & load user settings ****************

async function saveUserSettings() {
  const thEls = $('#tbl th');

  const userSettingsObj = {
    soundWordSelect: $('#sound-word-select').val(),
    soundTranslationSelect: $('#sound-translation-select').val(),
    soundExampleSelect: $('#sound-example-select').val(),
    translateLangWordSelect: $('#translate-lang-word-select').val(),
    translateLangTranslationSelect: $('#translate-lang-translation-select').val(),
    isTh1Hidden: thEls.eq(0).is(':hidden'),
    isTh2Hidden: thEls.eq(1).is(':hidden'),
    isTh3Hidden: thEls.eq(2).is(':hidden'),
    isTh4Hidden: thEls.eq(3).is(':hidden'),
    isTh5Hidden: thEls.eq(4).is(':hidden'),
    isTh6Hidden: thEls.eq(5).is(':hidden'),
    isTh7Hidden: thEls.eq(6).is(':hidden'),
    isTh8Hidden: thEls.eq(7).is(':hidden'),
    isTh9Hidden: thEls.eq(8).is(':hidden'),
    isTh10Hidden: thEls.eq(9).is(':hidden'),
    isTh11Hidden: thEls.eq(10).is(':hidden'),
    //indexOfRedArrow: $('.red-color').index('.arrow'),
  }

  let url = 'phps/save_user_settings.php';
  let formData = new FormData();
  formData.append('tbl', tbl);
  formData.append('userSettingsObj', JSON.stringify(userSettingsObj));
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  //console.log(result);
}

$('#sound-word-select, #sound-translation-select, #sound-example-select, #translate-lang-word-select, #translate-lang-translation-select').on('change', function () {
  if(!isCookie('Friend')) return;
  saveUserSettings();
});

$('.hide, .unhide').on('click', function () {
  if(!isCookie('Friend')) return;
  saveUserSettings();
});


// **************** onload ****************

function addMissingHtml() {
  $('#translate-lang-word-select, #translate-lang-translation-select').append(
    '<option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="am">Amharic</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="zh">Chinese</option><option value="zh-TW">Chinese (Trad)</option><option value="co">Corsican</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="fy">Frisian</option><option value="gd">Gaelic</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian</option><option value="ha">Hausa</option><option value="haw">Hawaiian</option><option value="he">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="ko">Korean</option><option value="ku">Kurdish</option><option value="ky">Kyrgyz</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="lb">Luxembourgish</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="ny">Nyanja</option><option value="ps">Pashto</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sm">Samoan</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="sn">Shona</option><option value="sd">Sindhi</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="xh">Xhosa</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option>'
  );

  $('#sound-word-select, #sound-translation-select, #sound-example-select').append(
    '<option value="ar">Arabic</option><option value="cmn">Chinese</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="fil">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="de">German</option><option value="el">Greek</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="id">Indonesian</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="nb">Norwegian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ru">Russian</option><option value="sk">Slovak</option><option value="es">Spanish</option><option value="sv">Swedish</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="vi">Vietnamese</option>'
  );

  $('#translate-lang-word-select').val('en');
  $('#translate-lang-translation-select').val('de');
  $('#sound-word-select').val('en');
  $('#sound-translation-select').val('de');
  $('#sound-example-select').val('en');
  setValsInSelect();


  $("textarea, [id*='input']").attr({ autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: 'false', value: '' });
}


function setSelectElsWidthForIOs() {
  // css text-align-last: center;  not supported in Safari
  // that is why imposible to center text of option in select el
  if (isiOS()) {
    // go through all selects - #translate-lang-word-select, #translate-lang-translation-select, #sound-word-select, #sound-translation-select, #sound-example-select
    $('select').each(function () {
      setSelectionWidth($(this));
    });
  }
}

let visitedBefore = false;

function manageCookiesAndVars() {
  if (!isCookie('Friend')) {
    // did not sign in for last 45 days or had logged out previously
    if (!isCookie('Stranger')) {
      //came first time or table expired after 3 days
      setCookie('Stranger', timeNowForTable() + '_' + Math.floor(Math.random() * 100 + 1), 3); // 3 days for temp table for nestyo8_strangers
      tbl = cookieVal('Stranger');
      isLoggedUser = 0;
      visitedBefore = false;
    }
    // already visited - take the same stranger table
    else {
      tbl = cookieVal('Stranger');
      isLoggedUser = 0;
      visitedBefore = true;
    }
  }
  //registered and logged in less than 45 days
  else {
    setCookie('Friend', cookieVal('Friend'), 45);
    setCookie('Mail', cookieVal('Mail'), 45);
    tbl = cookieVal('Friend');
    isLoggedUser = 1;
    loginVisualy();
  }
}

function createAndLoadStrangerTable() {
  $.ajax({
    type: 'POST',
    url: '/phps/stranger_table.php',
    data: {
      Table: cookieVal('Stranger'),
      Added: timeNow(),
    },
    success: function (data) {
      returnWordsArrFromServ().done( () => {
        displayWordsFromArr();
        $('#empty').hide();
        $('#new-vocab-add-words').show();
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('stranger_table.php');
      setTimeout(() => {$('#bottom-logos').show(); $('#bottom-error').hide();}, 10000);
    },
  });
}

async function isTableDeleted() {
  let url = '/phps/is_table_deleted.php';
  let formData = new FormData();
  formData.append('tbl', tbl);
  formData.append('isLoggedUser', isLoggedUser);
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  return (result == "table deleted") ? true : false;
}


function removeAllCookies() {
  setCookie('Friend', 666, -666);
  setCookie('Stranger', 666, -666);
  setCookie('Mail', 666, -666);
  isLoggedUser = false;
}


function loadStrangerOrFirendTable() {
  return new Promise( async function(resolve, reject) {

    if (isLoggedUser) {
      returnWordsArrFromServ().done(() => {
        displayWordsFromArr();
        stampForLoggedUser();
        loggedToday();
        isAdmin();
        resolve();
      });
    }
    else {
      if (visitedBefore) {
        returnWordsArrFromServ().done(() => {
          displayWordsFromArr();
          loggedToday();
          isAdmin();
          resolve();
        });
      }
      else {
        createAndLoadStrangerTable();
      }
    }

    const isDeleted = await isTableDeleted();
    if(isDeleted) {
      removeAllCookies();
      logoutVisualy();
      manageCookiesAndVars();
      loadStrangerOrFirendTable();
      isAdmin();
      // alert("words are missing or expired, empty vocab will be loaded");
      resolve();
    }

  });
}

function isSharableLink() {
  if (paramFromUrl('dict') != null) {
    setTimeout(() => $('#dimmed').fadeIn(), 50);
    setTimeout(() => $('#link-menu').fadeIn(), 300);
    $('html,body').scrollTop(0).scrollLeft(0);
  }
}

function getUserSettings() {
  //https://jsfiddle.net/sherbsherb/0vrda8nj/49/
  let dfrd = $.Deferred();

  if(!isLoggedUser) {
    dfrd.resolve();
    return;
  }

  $.ajax({
    url: '/phps/get_user_settings.php',
    data: {
      Table: tbl,
    },
    dataType: 'text',
    async: true,
    type: 'POST',
    success: function (text) {
      if (text == false) {
        dfrd.resolve();
        return;
      }
      else {
        const obj = $.parseJSON(text);
        $('#sound-word-select').val(obj.soundWordSelect);
        $('#sound-translation-select').val(obj.soundTranslationSelect);
        $('#sound-example-select').val(obj.soundExampleSelect);
        $('#translate-lang-word-select').val(obj.translateLangWordSelect);
        $('#translate-lang-translation-select').val(obj.translateLangTranslationSelect);

        const ths = $('#tbl th');

        function hideCol(i) {
          ths.eq(i).hide();
          ths.eq(i).closest('table').find('tbody td:nth-child(' + i + 1 + ')').hide();
          $('.unhide').addClass('font-weight-600');
        }

        if (obj.isTh1Hidden) hideCol(0);
        //if (obj.isTh2Hidden) hideCol(1); // can not be hidden
        if (obj.isTh3Hidden) hideCol(2);
        if (obj.isTh4Hidden) hideCol(3);
        if (obj.isTh5Hidden) hideCol(4);
        if (obj.isTh6Hidden) hideCol(5);
        if (obj.isTh7Hidden) hideCol(6);
        if (obj.isTh8Hidden) hideCol(7);
        if (obj.isTh9Hidden) hideCol(8);
        if (obj.isTh10Hidden) hideCol(9);
        if (obj.isTh11Hidden) hideCol(10);

        hideOrShowExampleCategory();
      }

      setValsInSelect();
      dfrd.resolve();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#bottom-logos').hide();
      $('#bottom-error').show().text('load_settings.php');
      setTimeout(() => {$('#bottom-logos').show();$('#bottom-error').hide();}, 10000);
      dfrd.resolve();
    },
  });

  return dfrd.promise();
}

async function testLink() {
  if (window.location.href == 'https://myvocab.org/test') {
    if (isLoggedUser) {
      $("[id*='input']").val('');
      $(':focus').blur();
      $('.arrow').removeClass('red-color');
      $('#arrow18').addClass('red-color');
      displayWordsFromArr();
      startTest();
    }
    else {
      alert('Log in first to start the test');
      loginWindow();
    }
  }
}

async function unsubscribeLink() {
  if (window.location.href == 'https://myvocab.org/unsubscribe') {
    if (isLoggedUser) {
      let url = '/phps/unsubscribe.php';
      let formData = new FormData();
      formData.append('tbl', tbl);
      let request = new Request(url, {method: 'POST', body: formData,});
      let response = await fetch(request);
      let result = await response.text();
      addAfterDomainInURL();
      if (result == "unsubscribed") {
        alert(`
UNSUBSCRIBED.

Test reminders will not be mailed anymore.

Inactive accounts will be deleted automatically in 6 months.
        `);
      }
    }
    else {
      alert('Log in first to unsubscribe');
      loginWindow();
    }
  }
}

async function isAdmin() {
  if (!tbl) return;
  let url = '/phps/is_admin.php';
  let formData = new FormData();
  formData.append('mail', $('#user-logged').text());
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  if (result == "admin") {
    $('#admin-btn ').show();
  } else {
    $('#admin-btn ').hide();
  }
}

window.onload = async function() {
  $('body').fadeIn(1500);
  $('#arrow10').addClass('red-color');
  isMobile = ($(window).width() < 500) ? true : false;
  addMissingHtml();
  isSharableLink();
  manageCookiesAndVars();
  await getUserSettings();
  await loadStrangerOrFirendTable();
  testLink();
  unsubscribeLink();
}


function dateFn(x) {
  // date and time
  let currentDate = x;
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  let dateStamp = year + '.' + month + '.' + day;
  return dateStamp;
}









$('#admin-btn, #update-stat-admin-btn').on('click', () => adminWindow());


async function adminWindow() {
  $('#dimmed, #admin-menu, #update-stat-loading-admin').show();
  $('#update-stat-admin-btn').hide();
  $('html,body').scrollTop(0).scrollLeft(0);

  await $.getScript('https://www.gstatic.com/charts/loader.js');
  // load the Visualization API and the corechart package
  await google.charts.load('current', { packages: ['corechart'] });
  // retieve data from php
  let url = '/phps/daily_stat.php';
  let formData = new FormData();
  formData.append('mail', $('#user-logged').text());
  let request = new Request(url, {method: 'POST', body: formData,});
  let response = await fetch(request);
  let result = await response.text();
  const obj = JSON.parse(result);
  //console.log(obj);

  barChartOptions = {
    colors: ['white'], width: 310, height: 150, chartArea: { top: 10, width: '80%', height: '60%' }, backgroundColor: 'transparent',
    legend: { position: 'none', textStyle: { color: 'white', }, },

    vAxis: {
      textStyle: { color: 'white', },
      gridlines: { color: '', },
    },

    hAxis: {
      textStyle: { color: 'white', },
      gridlines: { color: 'white', },
      baselineColor: 'white',
    },
  };

  // Create the chartData table.
  let barChartData1 = new google.visualization.DataTable();
  barChartData1.addColumn('string', 'Date');
  barChartData1.addColumn('number', 'Friends');
  barChartData1.addColumn({ type: 'string', role: 'style' }); // user colors for bars
  let barChartData2 = new google.visualization.DataTable();
  barChartData2.addColumn('string', 'Date');
  barChartData2.addColumn('number', 'Strangers');
  barChartData2.addColumn({ type: 'string', role: 'style' }); // user colors for bars
  let barChartData3 = new google.visualization.DataTable();
  barChartData3.addColumn('string', 'Date');
  barChartData3.addColumn('number', 'All');
  barChartData3.addColumn({ type: 'string', role: 'style' }); // user colors for bars
  //chart.draw(chartData, chartOptions);

  // Instantiate and draw our chart, passing in some options.
  barChart1 = new google.visualization.ColumnChart(document.getElementById('col-chart-admin-1'));
  barChart2 = new google.visualization.ColumnChart(document.getElementById('col-chart-admin-2'));
  barChart3 = new google.visualization.ColumnChart(document.getElementById('col-chart-admin-3'));
  //barChart.draw(barChartData, barChartOptions);

  // get arrays of dates and totalNum
  let dateFriendsArr = obj.friends.map(x => x.date).map(x => x.replaceAll('-', '.'));
  let dateStrangersArr = obj.strangers.map(x => x.date).map(x => x.replaceAll('-', '.'));
  let dateAllArr = obj.all.map(x => x.date).map(x => x.replaceAll('-', '.'));
  let totalNumFriendsArr = obj.friends.map(x => x.totalNum);
  let totalNumStrangersArr = obj.strangers.map(x => x.totalNum);
  let totalNumAllArr = obj.all.map(x => x.totalNum);

  // generated desired dates
  let dateArrNew = [];
  let date = new Date();
  for (i = 0; i < +$('#past-days-admin').text(); i++) {
    date.setDate(date.getDate() - i);
    dateArrNew[i] = dateFn(date);
    date = new Date();
  }

  // length of new arr
  const arrLen = dateArrNew.length;

  // find corresponding index of date and take totalNum with same index
  const totalNumFriendsArrNew = [];
  const totalNumStrangersArrNew = [];
  const totalNumAllArrNew = [];

  for (i = 0; i < arrLen; i++) {
    let index;

    totalNumFriendsArrNew[i] = 0;
    index = dateFriendsArr.findIndex(x => x == dateArrNew[i]);
    totalNumFriendsArrNew[i] = +totalNumFriendsArr[index];

    totalNumStrangersArrNew[i] = 0;
    index = dateStrangersArr.findIndex(x => x == dateArrNew[i]);
    totalNumStrangersArrNew[i] = +totalNumStrangersArr[index];

    totalNumAllArrNew[i] = 0;
    index = dateAllArr.findIndex(x => x == dateArrNew[i]);
    totalNumAllArrNew[i] = +totalNumAllArr[index];
  }

  totalNumFriendsArrNew.reverse();
  totalNumStrangersArrNew.reverse();
  totalNumAllArrNew.reverse();
  // show in dd.mm fromat
  dateArrNew = dateArrNew.reverse().map(x => x.slice(8) + '.' + x.slice(5, 7));

  for (i = 0; i < arrLen; i++) {
    barChartData1.addRows([[dateArrNew[i], totalNumFriendsArrNew[i], 'opacity: 0.7']]);
    barChartData2.addRows([[dateArrNew[i], totalNumStrangersArrNew[i], 'opacity: 0.7']]);
    barChartData3.addRows([[dateArrNew[i], totalNumAllArrNew[i], 'opacity: 0.7']]);
  }

  barChart1.draw(barChartData1, barChartOptions);
  barChart2.draw(barChartData2, barChartOptions);
  barChart3.draw(barChartData3, barChartOptions);

  $('#update-stat-admin-btn').show();
  $('#update-stat-loading-admin').hide();
}