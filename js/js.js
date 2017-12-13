// JavaScript Document
function LotteryDraw(obj){
    this.circle=obj.rotateCircle;
    this.prize=obj.prizeBox;
    this.thank=obj.thankBox;
    this.prizeMsg=obj.prizeMsg;
    this.startBtn=obj.startBtn;
    this.startEvent();
}

LotteryDraw.prototype = {
    constructor : LotteryDraw,
    /*
        概率

        1            抽水器
        2-3          纳翁一箱
        4            50代金券
        5-90         谢谢参与
        91 - 95      50积分
        96 - 97      30代金券
        98 - 99      30分享券
        100          28元红包

     */
    
    /*
    
        概率参数
        索引0 和 索引1 为概率范围
        索引2 为礼物的id
        索引3 为礼物详情

     */
     probability : [

        [1,1,1,'抽水器一台'],

        [2,3,2,'纳翁336ml一箱'],

        [4,4,3,'50代金券'],

        [5,90,4,'谢谢参与'],

        [91,95,5,'50积分'],

        [96,97,6,'30代金券'],

        [98,99,7,'30分享券'],

        [100,100,8,'28元红包']

    ],
    /*
    
           isAnimate 用于判断动画是否进行中  
        clearAnimate 用于保存动画
            startBtn 用于点击按钮
        rotateCircle 用于滚动转盘
               prize 用于判断弹出是否有奖品的弹出框
            prizeMsg 用于保存奖品信息

     */
    
    isAnimate : true,

    clearAnimate : '',

    circle : document.getElementById(this.rotateCircle),


    /*
    
        用于动画执行完成后的动作

     */
     callback : function(number){

        if(number == 4){

            var prize = document.getElementById(this.thank);

        }else{

            var prize = document.getElementById(this.prize);

            var prizeMessage = document.getElementById(this.prizeMsg);

            var img = document.createElement('IMG');

            img.setAttribute('src', 'images/prize'+number+'.png');

            var p = document.createElement('p');

            p.innerText = this.probability[number-1][3];

            prizeMessage.appendChild(img);

            prizeMessage.appendChild(p);
        }

        prize.style.display = 'block';

        clearInterval(this.clearAnimate)
        
        //this.isAnimate = true;
    },

    /*
    
        用于返回获取的奖品

     */

    getPrizeNumber : function (num){

        var number = '';

        this.probability.forEach( function(element, index) {

            if(num >= element[0] && num <= element[1]){

                number = index+1;

            }

        });

        return number;

    },

    /*
    
        用于点击事件

     */

    start : function(){

            var that = this;

            if(this.isAnimate){

            var number = this.getPrizeNumber(Math.ceil(Math.random()*100));

            console.log(number)

            circle.className = 'circle circle-animation-'+number+'';

            this.clearAnimate = setInterval(function(){

                that.callback(number)

            },10000)

            this.isAnimate = false;

        }

    },

    startEvent : function(){

        var startBtn = document.getElementById(this.startBtn);

        var that = this;

        startBtn.onclick = function(){

            that.start(); 

        }

    }   


}

var obj = new LotteryDraw({
    'rotateCircle' :  'circle',
    'prizeBox' : 'prize-box',
    'thankBox' : 'thanks-box',
    'prizeMsg' : 'prize',
    'startBtn' : 'start'
});


