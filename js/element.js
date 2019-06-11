// JavaScript Document
//元素的操作：修改背景颜色，字体颜色，字体大小，等等
var $ele={
	//selectObj是选择的对象
	datas:{selectObj:null,index:1},
	constentDatas:{TEXT:"text",PASSWORD:"password",TEXTAREA:"textarea",BUTTON:"button",LABEL:"label",SELECT:"select",CHECKBOX:"checkbox",RADIO:"radio",FULLTEXT:"fulltext"},
	
	createObject:{
		//创建单行文本
		createText:function(){
			var text = $("<input>");
			text.attr("type","text");
			text.attr("name","field" + $ele.datas.index);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(text);
			return text;			
		},
		//创建密码输入框
		createPassword:function(){
			var password = $("<input>");
			password.attr("type","password");
			password.attr("name","field" + $ele.datas.index);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(password);
			return password;
		},
		//创建文本域
		createTextArea:function(){
			var textarea = $("<textarea>");
			textarea.attr("wrap","hard");
			textarea.attr("rows","6");
			textarea.attr("cols","8");
			textarea.attr("name","field" + $ele.datas.index);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(textarea);
			return textarea;
		},
		//创建按钮
		createButton:function(){
			var button = $("<input>");
			button.attr("type","button");
			button.attr("value","测试数据");
			$ele.addClickEvent(button);
			return button;
		},
		//创建标签
		createLabel:function(){
			var label = $("<label>");
			label.text("测试数据");
			$ele.addClickEvent(label);
			return label;
		},
		//创建选择框
		createSelect:function(){
			var selects = $("<select>");
			selects.attr("name","field" + $ele.datas.index);
			var option = $("<option>");
			option.text("");
			option.attr("value","");
			selects.append(option);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(selects);
			return selects;
		},
		//创建复选
		createCheckBox:function(){
			var checkbox = $("<checkbox>");
			checkbox.attr("type","checkbox");
			checkbox.attr("value","test1");
			checkbox.attr("name","field" + $ele.datas.index);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(checkbox);
			return checkbox;
		},
		//创建单选
		createRadio:function(){
			var radio = $("<radio>");
			radio.attr("type","radio");
			radio.attr("value","test1");
			radio.attr("name","field" + $ele.datas.index);
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(radio);
			return radio;
		},
		//创建富文本编辑
		createFullText:function(){
			var fulltext = $("<iframe>");
			fulltext.attr("name","field" + $ele.datas.index);
			fulltext.attr("src","abc.html");
			fulltext.attr("style","width:100%;height:100%;border:none;margin:0px;padding:0px;");
			$ele.datas.index = $ele.datas.index + 1;
			$ele.addClickEvent(fulltext);
			return fulltext;
		}
	},
	
	//添加事件
	addClickEvent:function(obj){
		$(obj).click(function(e) {
            $ele.datas.selectObj = this;
        });
	},
	
	//创建元素type是类型
	createElement:function(type){
		switch(type){
			case $ele.constentDatas.TEXT:
				return $ele.createObject.createText();
			break;
			case $ele.constentDatas.PASSWORD:
				return $ele.createObject.createPassword();
			break;
			case $ele.constentDatas.TEXTAREA:
				return $ele.createObject.createTextArea();
			break;
			case $ele.constentDatas.BUTTON:
				return $ele.createObject.createButton();
			break;
			case $ele.constentDatas.LABEL:
				return $ele.createObject.createLabel();
			break;
			case $ele.constentDatas.SELECT:
				return $ele.createObject.createSelect();
			break;
			case $ele.constentDatas.CHECKBOX:
				return $ele.createObject.createCheckBox();
			break;
			case $ele.constentDatas.RADIO:
				return $ele.createObject.createRadio();
			break;
			case $ele.constentDatas.FULLTEXT:
				return $ele.createObject.createFullText();
			break;
			default:
				return null;
			break;	
		}
	},
	
	//修改属性
	modifyAttribute:{
		modifyName:function(name){
			$($ele.datas.selectObj).attr("name",name);
		},
		modifyValue:function(value){
			$($ele.datas.selectObj).attr("value",value);	
		},
		modifyText:function(text){
			$($ele.datas.selectObj).text(text);	
		},
		modifyWidth:function(width){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";width",width,style);
			$($ele.datas.selectObj).attr("style",style);
		},
		modifyHeight:function(height){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";height",height,style);
			$($ele.datas.selectObj).attr("style",style);
		},
		modifyColor:function(color){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";color",color,style);
			$($ele.datas.selectObj).attr("style",style);
		},
		modifyBgColor:function(bgColor){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";background-color",bgColor,style);
			$($ele.datas.selectObj).attr("style",style);
		},
		modifyTextSize:function(size){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";font-size",size,style);
			$($ele.datas.selectObj).attr("style",style);
		},
		modifyTextFamily:function(family){
			var style = $($ele.datas.selectObj).attr("style");
			style = $ele.util.alterStyleAttr(";font-family",family,style);
			$($ele.datas.selectObj).attr("style",style);
		}
	},
	//工具类
	util:{
		//修改元素的style属性
		alterStyleAttr:function(attr,value,style){
			var resultStr = "";
			if(style == "" || style == null){
				resultStr = attr + ":" + value + ";";
			}else{
				//获取属性的位置
				var attrFirst = style.indexOf(attr);
				if(attrFirst != -1){
					//截取属性之前的值
					var firstStr = style.substring(0,attrFirst);
					//截取属性包含属性之后的值
					var secondStr = style.substr(attrFirst);
					//获取第一个;的位置
					var attrSecond = secondStr.indexOf(";");
					//获取;之后包含;的值
					var thirdStr =  secondStr.substr(attrSecond);
					//修改attr属性的值并且返回
					resultStr = firstStr + attr + ":" + value + thirdStr;
				}else{
					resultStr = style + attr + ":" + value + ";";
				}
			}
			return resultStr;
		},
		//删除属性
		removeStyleAttr:function(attr,style){
			var resultStr = "";
			if(style == "" || style == null){
				resultStr = style;
			}else{
				//获取属性的位置
				var attrFirst = style.indexOf(attr);
				if(attrFirst != -1){
					//截取属性之前的值
					var firstStr = style.substring(0,attrFirst);
					//截取属性包含属性之后的值
					var secondStr = style.substr(attrFirst);
					//获取第一个;的位置
					var attrSecond = secondStr.indexOf(";");
					//获取;之后包含;的值
					var thirdStr =  secondStr.substr(attrSecond+1);
					//修改attr属性的值并且返回
					resultStr = firstStr + thirdStr;
				}else{
					resultStr = style;
				}
			}
			return resultStr;
		}
	}
};