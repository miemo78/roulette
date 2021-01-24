//変数の定義
var interval_id = null;
var length;
var index;

function make_table() {
    var number = 1;

    for (j = 1; j <= 4; j++) {
        $('#roulette').append('<tr></tr>');

        for (i = 1; i <= 4; i++) {
            $('tr:last-child').append('<td>' + number + '</td>');
            number++;
        }
    }

}

//スタートボタンを押してタイマーを起動させる
function start_button_click() {
    if (interval_id === null) {
        interval_id = setInterval(spin_roulette, 50);
        $("#start_button").prop("disabled", true);
        $("#stop_button").prop("disabled", false);
    }
}

//ルーレットを回した時の処理
function spin_roulette() {
    //色を付けたパネルから消す
    $('td').removeClass('highlight');
    //パネルに色をつける番号をランダムで選択する
    length = $('td:not(.stopped)').length;
    index = Math.floor(Math.random() * length);
    //選択した番号のパネルに色をつける
    $('td:not(.stopped)').eq(index).addClass('highlight');
}

function stop_button_click() {
    //タイマーを停止する
    clearInterval(interval_id);
    interval_id = null;
    //現在色がついたパネルに、停止したことを示すクラスstoppedを追加
    $('td.highlight').addClass('stopped');


    //全てのパネルに停止したらルーレット終了
    if ($('td:not(.stopped)').length < 1) {
        $("#start_button").prop("disabled", true);
        $("#stop_button").prop("disabled", true);
    } else {
        $("#start_button").prop("disabled", false);
        $("#stop_button").prop("disabled", true);
    }
}

function reset_button_click() {
    //タイマーが起動中なら
    if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
    }
    //tdタグのhighlightクラス、stoppedクラスを削除
    $('td').removeClass('highlight');
    $('td').removeClass('stopped');

    //ボタンを戻す
    $("#start_button").prop("disabled", false);
    $("#stop_button").prop("disabled", true);
}

$(document).ready(function () {
    $('#start_button').click(start_button_click);
    $('#stop_button').click(stop_button_click);
    $('#reset_button').click(reset_button_click);

    make_table();

    $("#start_button").prop("disabled", false);
    $("#stop_button").prop("disabled", true);
})
