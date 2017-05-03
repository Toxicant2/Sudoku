var count = 1.4;
var origin = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [3, 1, 2, 6, 4, 5, 9, 7, 8],
    [6, 4, 5, 9, 7, 8, 3, 1, 2],
    [9, 7, 8, 3, 1, 2, 6, 4, 5],
    [2, 3, 1, 5, 6, 4, 8, 9, 7],
    [5, 6, 4, 8, 9, 7, 2, 3, 1],
    [8, 9, 7, 2, 3, 1, 5, 6, 4]
];
$(document).ready(function () {
    cc(origin);
})
var ccxx = 0;
var timer = null;
function getHtml2Canvas() {
    html2canvas(document.getElementById('tab')).then(function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.download = "sudu.jpg";
        a.click();
    });
};
function cc(origin) {
    clearInterval(timer);
    var _html = "";
    $.each(origin, function (i, v) {
        _html += '<tr>';
        $.each(v, function (index, val) {
            if (Math.random() * count > 1) {
                _html += '<td><input type="text" /></td>'
            } else {
                _html += '<td>' + val + '</td>'
            }

        });
        _html += '</tr>';
    });
    $("#tb").html(_html);
    ccxx = 0;
    timer = setInterval(function () {
        $("#times").html(ccxx++);
    }, 1000);
}
function chagness(c) {
    if (c) {
        count = c;
    }
    var num = 100;
    var o = origin;
    for (var i = 0; i < num; i++) {
        o = change(o, parseInt(Math.random().toString()[3]), parseInt(Math.random().toString()[4]), i % 2);
    }
    cc(o);
}
function change(origin, index1, index2, type) {
    type = !!type || false;//true:行交换 false:列交换
    if (index1 > 8) {
        index1 = 8;
    }
    index2 = index1 + 1;
    if (index2 > 8) {
        index2 = 8;
    }
    if ((index1 <= 2 && index1 >= 0 && index2 <= 2 && index2 >= 0) || (index1 <= 5 && index1 >= 3 && index2 <= 5 && index2 >= 3) || (index1 <= 8 && index1 >= 6 && index2 <= 8 && index2 >= 6)) {
        if (type) {
            var s = origin[index1];
            origin[index1] = origin[index2];
            origin[index2] = s;
            return origin;
        }
        else {
            var s = 0;
            for (var i = 0; i <= 8; i++) {
                s = origin[i][index1].toString();
                origin[i][index1] = origin[i][index2];
                origin[i][index2] = parseInt(s);
            }
            return origin;
        }
    }
    else
        return origin;

}

function getList() {
    var list = [];
    var trlist = $(".tab").find("tr");
    var trdata = [];
    $.each(trlist, function (i, v) {
        trdata = [];
        $.each($(v).find("td"), function (index, val) {
            trdata.push(val.textContent == "" ? ($(val).find("input").val() == "" ? 0 : parseInt($(val).find("input").val())) : parseInt(val.textContent));
        });
        list.push(trdata);
    });
    return list;
}
function checkAll() {
    var list = getList();
    var flag = true;
    for (var i = 0; i < 9; i++) {
        if (!checkLine(list, i, true))
            return false;
        if (!checkLine(list, i, false))
            return false;
        if (i < 3) {
            for (ii = 0; ii < 3; ii++) {
                if (!checkSquare(list, 3 * i, 3 * ii)) {
                    flag = false;
                    return false;
                }
            }
            if (!flag)
                return false;
        }


    }
    return true;

}
function checkLine(list, index, type) {
    type = !!type || false;//true 行 false 列
    var checkList = "";
    var temp = "";
    for (var i = 0; i < 9; i++) {
        temp = type ? list[index][i].toString() : list[i][index].toString();

        if (temp != "0") {
            if (checkList.indexOf(temp) >= 0)
                return false;
            else
                checkList += temp;
        }
    }
    return true;
}
function checkSquare(list, x, y) {
    var checkList = "";
    var temp = "";
    for (var i = 0; i < 3; i++) {
        for (var ii = 0; ii < 3; ii++) {
            temp = list[x + i][y + ii].toString();

            if (temp != "0") {
                if (checkList.indexOf(temp) >= 0)
                    return false;
                else
                    checkList += temp;
            }
        }
    }
    return true;
}