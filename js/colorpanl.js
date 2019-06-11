// JavaScript Document
//颜色面板
var $colorPanl = {
	colorDatas:{colorR:'',colorG:'',colorB:'',colorA:'',width:'',height:'',inputR:null,inputG:null,inputB:null,inputA:null,parentId:''},
	
	panleOption:{
		initColor:function(){
			
		},
		createTd:function(td,color){
			$(td).css({width:"20px",height:"20px",backgroundColor:color});
			$(td).click(function(e) {
                var bgColor = $(this).css("background-color");
				bgColor = bgColor.substring(1);
				var R = bgColor.substring(0,2);
				var G = bgColor.substring(2,2);
				var B = bgColor.substring(4);
				$colorPanl.colorDatas.colorB = B;
				$colorPanl.colorDatas.colorA = $(this).css("background-color");
				$colorPanl.colorDatas.colorG = G;
				$colorPanl.colorDatas.colorR = R;
				$colorPanl.colorOption.setInputAValue();
            });
		},
		createTr:function(table){
			
		}
	},
	
	colorOption:{
		setInputRValue:function(){
			if($colorPanl.colorDatas.inputR == null) return;
			$($colorPanl.colorDatas.inputR).val($colorPanl.colorDatas.colorR);
		},
		getInputRValue:function(){
			if($colorPanl.colorDatas.inputR == null) return;
			var con = $($colorPanl.colorDatas.inputR).val();
			if(con == '' || con == null || con.length>2) return;
			$colorPanl.colorDatas.colorR = con;
			$colorPanl.colorOption.setInputAValue();
		},
		setInputGValue:function(){
			if($colorPanl.colorDatas.inputG == null) return;
			$($colorPanl.colorDatas.inputG).val($colorPanl.colorDatas.colorG);
		},
		getInputGValue:function(){
			if($colorPanl.colorDatas.inputG == null) return;
			var con = $($colorPanl.colorDatas.inputG).val();
			if(con == '' || con == null || con.length>2) return;
			$colorPanl.colorDatas.colorG = con;
			$colorPanl.colorOption.setInputAValue();
		},
		setInputBValue:function(){
			if($colorPanl.colorDatas.inputB == null) return;
			$($colorPanl.colorDatas.inputB).val($colorPanl.colorDatas.colorB);
		},
		getInputBValue:function(){
			if($colorPanl.colorDatas.inputB == null) return;
			var con = $($colorPanl.colorDatas.inputB).val();
			if(con == '' || con == null || con.length>2) return;
			$colorPanl.colorDatas.colorB = con;
			$colorPanl.colorOption.setInputAValue();
		},
		setInputAValue:function(){
			if($colorPanl.colorDatas.inputA == null) return;
			if($colorPanl.colorDatas.colorR == '' || $colorPanl.colorDatas.colorR.length>2) return;
			if($colorPanl.colorDatas.colorG == '' || $colorPanl.colorDatas.colorG.length>2) return;
			if($colorPanl.colorDatas.colorB == '' || $colorPanl.colorDatas.colorB.length>2) return;
			var colorCon = "#";
			colorCon = $colorPanl.util.concatColor(colorCon,$colorPanl.colorDatas.colorR);
			colorCon = $colorPanl.util.concatColor(colorCon,$colorPanl.colorDatas.colorG);
			colorCon = $colorPanl.util.concatColor(colorCon,$colorPanl.colorDatas.colorB);
			$($colorPanl.colorDatas.inputA).val(colorCon);
		},
		getInputAvalue:function(){
			if($colorPanl.colorDatas.inputA == null) return;
			var con = $($colorPanl.colorDatas.inputA).val();
			if(con == '' || con == null || con.length<4 || con.length>7) return;
			con = con.substr(1);
			if(con.length == 3){
				colorCon,$colorPanl.colorDatas.colorR = con.substr(0,1);
				colorCon,$colorPanl.colorDatas.colorG = con.substr(1,1);
				colorCon,$colorPanl.colorDatas.colorB = con.substr(2);
			}else if(con.length == 4){
				colorCon,$colorPanl.colorDatas.colorR = con.substr(0,2);
				colorCon,$colorPanl.colorDatas.colorG = con.substr(2,1);
				colorCon,$colorPanl.colorDatas.colorB = con.substr(3);
			}else if(con.length == 5 || con.length == 6){
				colorCon,$colorPanl.colorDatas.colorR = con.substr(0,2);
				colorCon,$colorPanl.colorDatas.colorG = con.substr(2,2);
				colorCon,$colorPanl.colorDatas.colorB = con.substr(4);
			}
			$colorPanl.colorOption.setInputBValue();
			$colorPanl.colorOption.setInputGValue();
			$colorPanl.colorOption.setInputRValue();
			$colorPanl.colorOption.setInputAValue();
		}
	},
	util:{
		concatColor:function(colorCon,color){
			if(color.length == 1){
				colorCon = colorCon + color + color;
			}else if(color.length == 2){
				colorCon = colorCon + color;
			}
			return colorCon;
		}
	}
}