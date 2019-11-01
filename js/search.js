$(document).ready(function () {
    var a = document.cookie;
    var value = a.split('=');
    console.log(value[1]);
    if (value[1] == 1) {
        $.getJSON("../js/search01.json", function (res) {
            var ulStr = "";
            console.log(res);
            $.each(res, function (index, ele) {
                ulStr +=
                    `  <li>
						<a href="#">
							<div class="imgs">
								<img src="${ele.img}">
							</div>
							<div class="word">
								<h4>"${ele.name1}"</h4>
								<p>"${ele.name2}"</p>
								<div class="price">
									<p>"${ele.price1}"</p>
								
								</div>
							</div>
						</a>
					</li>`
            })
            $(".content>ul").eq(0).html(ulStr);
        })

    } else if (value[1] == 2) {
        $.getJSON("../js/search.json", function (res) {
            var ulStr = "";
            console.log(res);
            $.each(res, function (index, ele) {
                ulStr +=
                    `  <li>
						<a href="#">
							<div class="imgs">
								<img src="${ele.img}">
							</div>
							<div class="word">
								<h4>"${ele.name2}"</h4>
								<p>"${ele.name1}"</p>
								<div class="price">
                                    <p>"${ele.price1}"</p>
                                    <span>"${ele.price2}"</span>
								</div>
							</div>
						</a>
					</li>`
            })
            $(".content>ul").eq(1).html(ulStr);
        })

    } else if(value[1] == 3) {
        $.getJSON("../js/search01.json", function (res) {
            var ulStr = "";
            console.log(res);
            $.each(res, function (index, ele) {
                ulStr +=
                    `  <li>
						<a href="#">
							<div class="imgs">
								<img src=${ele.img}>
							</div>
							<div class="word">
								<h4>${ele.name1}</h4>
								<p>${ele.name2}</p>
								<div class="price">
									<p>${ele.price1}</p>
								
								</div>
							</div>
						</a>
					</li>`
            })
            $(".content>ul").eq(0).html(ulStr);
        })
        $.getJSON("../js/search.json", function (res) {
            var ulStr = "";
            console.log(res);
            $.each(res, function (index, ele) {
                ulStr +=
                    `  <li>
						<a href="#">
							<div class="imgs">
								<img src=${ele.img}>
							</div>
							<div class="word">
								<h4>${ele.name2}</h4>
								<p>${ele.name1}</p>
								<div class="price">
                                    <p>${ele.price1}</p>
                                    <span>${ele.price2}</span>
								</div>
							</div>
						</a>
					</li>`
            })
            $(".content>ul").eq(1).html(ulStr);
        })
    }

})