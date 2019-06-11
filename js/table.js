// JavaScript Document
/**
对外的接口说明和属性说明
setData中的属性是用户可以指定的。

函数：
mergeTable.mergeTd()函数是合并单元格的函数
mergeTable.dispartTd()函数是拆分单元格的函数
mergeTable.clearSelect()函数是清空选择的颜色的。
tableop.insertCol(type)表示插入列，type==$table.constDa.INSERTCOLLEFT表示在选择的列的左边添加列，等于$table.constDa.INSERTCOLRIGHT表示在右边
tableop.deleteCol()函数表示删除选中的列
tableop.insertRow(type)表示插入的行，type==$table.constDa.INSERTROWUP表示在选择的行的上方添加行，等于$table.constDa.INSERTROWDOWN表示在下方
tableop.deleteRow()函数是表示删除选中的行
createTable(col,row,parentId)表示创建表，col表示创建多少列，row表示创建多少行，parentId表示容器的id，不用加#
widthTable(width)修改表的宽度，width表示宽度，单位没有指定，可以自己填写单位
heightTable(height)修改表的高度，height表示高度，单位没有指定，可以自己填写单位
alterBorder.borderUp()函数表示修改单元格的上边框
alterBorder.borderDown()函数表示修改单元格的下边框
alterBorder.borderLeft()函数表示修改单元格的左边框
alterBorder.borderRight()函数表示修改单元格的右边框
alterBorder.borderAll()函数表示修改单元格的所有边框
alterBorder.borderUp(ls,lt,lc)函数表示修改单元格的上边框,ls表示边框的大小，单位不没有自定，lt表示边框的类型，和css表框的颜色一样，lc表示边框的颜色
alterBorder.borderDown(ls,lt,lc)函数表示修改单元格的下边框，ls表示边框的大小，单位不没有自定，lt表示边框的类型，和css表框的颜色一样，lc表示边框的颜色
alterBorder.borderLeft(ls,lt,lc)函数表示修改单元格的左边框，ls表示边框的大小，单位不没有自定，lt表示边框的类型，和css表框的颜色一样，lc表示边框的颜色
alterBorder.borderRight(ls,lt,lc)函数表示修改单元格的右边框，ls表示边框的大小，单位不没有自定，lt表示边框的类型，和css表框的颜色一样，lc表示边框的颜色
alterBorder.borderAll(ls,lt,lc)函数表示修改单元格的所有边框，ls表示边框的大小，单位不没有自定，lt表示边框的类型，和css表框的颜色一样，lc表示边框的颜色
alterAlign.levelLeft()函数表示单元格左对齐
alterAlign.levelCenter()函数表示单元格居中对齐
alterAlign.levelRight()函数表示单元格右对齐
alterAlign.verticalTop()函数表示单元格垂直上方对齐
alterAlign.verticalMiddle()函数表示单元格垂直居中对齐
alterAlign.verticalBottom()函数表示单元格垂直低端对齐
updateContent.modifyFontFraily(fontFamily)函数表示修改单元格的字体，fontFamily表示字体
updateContent.modifyFontSize(size)函数表示修改字体的大小，size表示大小
updateContent.modifyFontColor(color)函数表示修改字体的颜色，color表示颜色
updateContent.modifyBgColor(color)函数表示修改背景的颜色，color表示颜色
updateContent.modifyTdHeight(height)函数修改单元格的高度，height表示高度
updateContent.modifyTdWidth(width)函数修改单元格的宽度，width表示宽度
addElementToTd(ele) 函数是向单元格添加元素 ele是元素的对象
removeElementFromTd（）函数是将单元格中的元素删除掉
*/
var $table = {
	//用户设置的属性
	setData:{
		//选择的颜色
		selectColor:"#888",
		//未选择的颜色
		unSelectColor:"#FFF",
		//操作的对象表
		tableObj:null
	},
	//系统自带的属性，是在运行中产生的数据
	datas:{
		//开始选择的单元格
		startObj:null,
		//开始选择的单元格的x坐标
		sectionX:0,
		//开始选择的单元格的y坐标
		sectionY:0,
		//结束选择的单元格的x坐标
		sectionS:0,
		//结束选择的单元格的y坐标
		sectionT:0,
		//是否开启合并选择
		mergeSta:false,
		//表的中行数量
		totalRow:3,
		//表的总列数量
		totalCol:5
	},
	//常量数据
	constDa:{
		//左方向插入
		INSERTCOLLEFT:"left",
		//右方向插入
		INSERTCOLRIGHT:"right",
		//上方向插入
		INSERTROWUP:"up",
		//下方插入
		INSERTROWDOWN:"down",
		//增加id
		IDADDVALUE:"add",
		//减少id
		IDSUBVALUE:"sub",
		//背景颜色的设置常量
		TDBACKCOLOR:"bgcolor"
	},
	
	//合并拆分完成
	mergeTable:{
		//选择单元格
		selectMouseDown:function(obj){
			$table.mergeTable.clearSelect();
			$table.datas.mergeSta = true;
			$table.datas.startObj = obj;
			var x = $(obj).attr("x");
			var y = $(obj).attr("y");
			$table.datas.sectionX = parseInt(x);
			$table.datas.sectionY = parseInt(y);
			$table.datas.sectionS = parseInt(x);
			$table.datas.sectionT = parseInt(y);
			var style = $(obj).attr("style");
			style = $table.util.alterStyleAttr("background-color",$table.setData.selectColor,style);
			$(obj).attr("style",style);
		},
		//选择单元格的方法
		selectMouseOver:function(obj){
			//console.log(obj);
			
			event.stopPropagation();
			if(!$table.datas.mergeSta) return;
			$table.mergeTable.clearSelect();
			var x = $(obj).attr("x");
			var y = $(obj).attr("y");
			$table.datas.sectionS = parseInt(x);
			$table.datas.sectionT = parseInt(y);
			$table.mergeTable.addSelectAt();
		},
		selectMouseUp:function(obj){
			$table.datas.mergeSta = false;
		},
		mergeTd:function(){
			if($table.mergeTable.justifyMerge()){
				alert("选择的单元格中有合并单元格，\n因此不能合并单元格");
				return;	
			}
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			var th = 0;
			var tw = 0;
			var firstObj = null;
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var temph = parseInt($(obj).css("height"));
					var tempw = parseInt($(obj).css("width"));
					th = th + temph;
					tw = tw + tempw;
					if(i==minX && j==minY){
						var col = maxX - minX + 1;
						var row = maxY - minY + 1;
						$(obj).attr("colspan",col);
					    $(obj).attr("rowspan",row);
						firstObj = obj;
					}else{
						$(obj).remove();
					}
				}
			}
			var style = $(firstObj).attr("style");
			style = $table.util.alterStyleAttr("width",width,style);
			style = $table.util.alterStyleAttr("height",height,style);
			$(firstObj).attr("style",style);
		},
		dispartTd:function(){
			if(!$table.mergeTable.justifySimpleMerge()){
				alert("选择的单元格不是合并单元格\n不能拆分单元格");
				return;	
			}
			var obj = $($table.datas.startObj);
			var col = parseInt($(obj).attr("colspan"));
			var row = parseInt($(obj).attr("rowspan"));
			var x = parseInt($(obj).attr("x"));
			var y = parseInt($(obj).attr("y"));
			var tempw = parseInt($(obj).attr("width"));
			var temph = parseInt($(obj).attr("height"));
			var tw = temph / row;
			var th = tempw / col;
			var width = "" + tw + "px";
			var height = "" + th + "px";
			//如果x不等于1，表示之前还有数据
			//如果y不等于1，表示之前还有数据
			//获取合并单元格的父级		
			var parent = null;
			var borther = null;	
			var indexY = y;
			for(var i=1;i<=row; i++){
				if(i==1){
					parent = $(obj).parent();
					borther = obj.next();
					console.log(borther);
				}else{
					indexY ++;
					parent = parent.next();
					if(borther == null || borther.length == 0){
						borther == null;	
					}else{
						borther = $table.mergeTable.getTailData(parent,x);
					}
				}
				var indexX = x;
				for(var j=1;j<=col;j++){
					if(j!=1){
						indexX ++;
					}
					if(i==1 && j==1){
						$(obj).attr("colspan",1);
						$(obj).attr("rowspan",1);
					}else{
						var td = $("<td>");
						td.text("");
						td.attr("id",indexX + "_" + indexY);
						td.attr("x",indexX);
						td.attr("y",indexY);
						td.attr("onselectstart","return false");
						td.attr("onselect","document.selection.empty()");
						var style = "";
						style = $table.util.alterStyleAttr("border-right","1px dashed #000",style);
						style = $table.util.alterStyleAttr("border-top","1px dashed #000",style);
						style = $table.util.alterStyleAttr("border-left","1px dashed #000",style);
						style = $table.util.alterStyleAttr("border-bottom","1px dashed #000",style);
						style = $table.util.alterStyleAttr("overflow","hidden",style);
						if(width == null || width == '' || undefined==(width)){
							width = "120px";	
						}
						if(height == null || height == '' || undefined==(height)){
							height = "30px";	
						}
						style = $table.util.alterStyleAttr("width",width,style);
						style = $table.util.alterStyleAttr("height",height,style);
						td.attr("style",style);
						td.mousedown(function(e) {
                            $table.mergeTable.selectMouseDown(this);
                        });
						td.mouseover(function(e) {
                            $table.mergeTable.selectMouseOver(this);
                        });
						if(borther.length == 0 || borther == null){
							parent.append(td);	
						}else{
							$(borther).before(td);
						}
					}
				}
			}
		},
		getTailData:function(parent,x){
			var children = $(parent).children();
			if(children == null || children.length == 0) return null;
			var index = 0;
			for(var i=0; i<children.length; i++){
				index = parseInt($(children[i]).attr("x"));
				if(index > x) return children[i];
			}
		},
		//判断选择的单元格是否是合并单元格
		justifySimpleMerge:function(){
			var obj = $($table.datas.startObj);
			var col = $(obj).attr("colspan");
			var row = $(obj).attr("rowspan");
			if(parseInt(col)>1) return true;
			if(parseInt(row)>1) return true;
		},
		//判断要合并的单元格是否含有合并的单元格
		justifyMerge:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var col = $(obj).attr("colspan");
					var row = $(obj).attr("rowspan");
					if(parseInt(col)>1) return true;
					if(parseInt(row)>1) return true;
				}
			}
		},
		//添加选择的颜色
		addSelectAt:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					console.log(obj);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr("background-color",$table.setData.selectColor,style);
					$(obj).attr("style",style);
				}
			}
		},
		//清空选择
		clearSelect:function(){
			$($table.setData.tableObj).children().each(function(index, element) {
                $(element).children().each(function(index, element) {
					$(element).children().each(function(index, element) {
                        var style = $(element).attr("style");
						var color = $(element).attr($table.constDa.TDBACKCOLOR);
						if(color == null || color == "" || color.length == 0){
							color = $table.setData.unSelectColor;
						}
						style = $table.util.alterStyleAttr("background-color",color,style);
						$(element).attr("style",style);
                    });
                });
            });
		}
	},
	
	//表的操作,主要是操作添加列和行的操作
	tableop:{
		//插入列的数据
		insertCol:function(type){
			if($table.tableop.justifyColMerge($table.datas.startObj)){
				alert("删除栏目中有合并单元格\n不能添加列");
				return false;	
			}
			var x = parseInt($($table.datas.startObj).attr("x"));
			var y = parseInt($($table.datas.startObj).attr("y"));
			var parent = $("#"+x1+"_"+j);
			//在左方向插入数据
			if(type == $table.constDa.INSERTCOLLEFT){
				for(var j=1;j<=$table.datas.totalRow; j++){
					for(var i=$table.datas.totalCol;i>=x;i--){
						var obj = $("#"+i+"_"+j);
						if(obj == null || obj.length == 0) continue;
						$table.tableop.modifyColId(obj,$table.constDa.IDADDVALUE);
					}
				}
				for(var j=1;j<=$table.datas.totalRow; j++){
					var x1 = x+1;
					var obj = $("#"+x1+"_"+j);
					$table.tableop.insertLeftTd(obj,x,j);
				}
			//在右方向插入数据
			}else if(type == $table.constDa.INSERTCOLRIGHT){
				for(var j=1;j<=$table.datas.totalRow; j++){
					for(var i=$table.datas.totalCol;i>=x+1;i--){
						var obj = $("#"+i+"_"+j);
						if(obj == null || obj.length == 0) continue;
						$table.tableop.modifyColId(obj,$table.constDa.IDADDVALUE);
					}
				}
				for(var j=1;j<=$table.datas.totalRow; j++){
					var x1 = x+1;
					var obj = $("#"+x+"_"+j);
					$table.tableop.insertRightTd(obj,x1,j);
				}
			}
			$table.datas.totalCol = $table.datas.totalCol + 1;
		},
		insertLeftTd:function(obj,x,y,width,height){
			var td = $("<td>");
			td.html("&nbsp;");
			td.attr("id",x + "_" + y);
			td.attr("x",x);
			td.attr("y",y);
			td.attr("onselectstart","return false");
			td.attr("onselect","document.selection.empty()");
			var style = "";
			style = $table.util.alterStyleAttr("border-right","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-top","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-left","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-bottom","1px dashed #000",style);
			style = $table.util.alterStyleAttr("overflow","hidden",style);
			if(width == null || width == '' || undefined==(width)){
				width = "120px";	
			}
			if(height == null || height == '' || undefined==(height)){
				height = "30px";	
			}
			style = $table.util.alterStyleAttr("width",width,style);
			style = $table.util.alterStyleAttr("height",height,style);
			td.attr("style",style);
			td.mousedown(function(e) {
				$table.mergeTable.selectMouseDown(this);
			});
			td.mouseover(function(e) {
				$table.mergeTable.selectMouseOver(this);
			});
			$(obj).before(td);
		},
		insertRightTd:function(obj,x,y,width,height){
			var td = $("<td>");
			td.html("&nbsp;");
			td.attr("id",x + "_" + y);
			td.attr("x",x);
			td.attr("y",y);
			td.attr("onselectstart","return false");
			td.attr("onselect","document.selection.empty()");
			var style = "";
			style = $table.util.alterStyleAttr("border-right","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-top","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-left","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-bottom","1px dashed #000",style);
			style = $table.util.alterStyleAttr("overflow","hidden",style);
			if(width == null || width == '' || undefined==(width)){
				width = "120px";	
			}
			if(height == null || height == '' || undefined==(height)){
				height = "30px";	
			}
			style = $table.util.alterStyleAttr("width",width,style);
			style = $table.util.alterStyleAttr("height",height,style);
			td.attr("style",style);
			td.mousedown(function(e) {
				$table.mergeTable.selectMouseDown(this);
			});
			td.mouseover(function(e) {
				$table.mergeTable.selectMouseOver(this);
			});
			$(obj).after(td);
		},
		insertTd:function(parent,x,y,width,height){
			var td = $("<td>");
			td.html("&nbsp;");
			td.attr("id",x + "_" + y);
			td.attr("x",x);
			td.attr("y",y);
			td.attr("onselectstart","return false");
			td.attr("onselect","document.selection.empty()");
			var style = "";
			style = $table.util.alterStyleAttr("border-right","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-top","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-left","1px dashed #000",style);
			style = $table.util.alterStyleAttr("border-bottom","1px dashed #000",style);
			style = $table.util.alterStyleAttr("overflow","hidden",style);
			if(width == null || width == '' || undefined==(width)){
				width = "120px";	
			}
			if(height == null || height == '' || undefined==(height)){
				height = "30px";	
			}
			style = $table.util.alterStyleAttr("width",width,style);
			style = $table.util.alterStyleAttr("height",height,style);
			td.attr("style",style);
			td.mousedown(function(e) {
				$table.mergeTable.selectMouseDown(this);
			});
			td.mouseover(function(e) {
				$table.mergeTable.selectMouseOver(this);
			});
			$(parent).append(td);
		},
		//删除列这个修改不考虑合并的单元格
		deleteCol:function(){
			if($table.tableop.justifyColMerge($table.datas.startObj)){
				alert("删除栏目中有合并单元格\n不能删除");
				return false;	
			}
			var x = parseInt($($table.datas.startObj).attr("x"));
			for(var j=1;j<=$table.datas.totalRow; j++){
				$("#" + x + "_" + j).remove();
			}
			for(var j=1;j<=$table.datas.totalRow; j++){
				for(var i=x+1;i<=$table.datas.totalCol;i++){
					var obj = $("#"+i+"_"+j);
					if(obj == null || obj.length == 0) continue;
					$table.tableop.modifyColId(obj,$table.constDa.IDSUBVALUE);
				}
			}
			$table.datas.totalCol = $table.datas.totalCol - 1;
		},
		//判断对象obj所在的列是否存在合并的单元格
		justifyColMerge:function(obj){
			var x = parseInt($(obj).attr("x"));
			for(var j=1;j<=$table.datas.totalRow; j++){
				var obj = $("#"+x+"_"+j);
				if(obj == null || obj.length == 0) {
					return true;
				}
				var colspan = parseInt($(obj).attr("colspan"));
				var rowspan = parseInt($(obj).attr("rowspan"));
				if(colspan>1 || rowspan>1){
					return true;	
				}
			}
		},
		//插入行
		insertRow:function(type){
			if($table.tableop.justifyRowMerg($table.datas.startObj)){
				//该行有合并的列，不能创建列
				alert("该行有合并的列，不能创建列");
				return;
			}
			var y = parseInt($($table.datas.startObj).attr("y"));
			var row = $($table.datas.startObj).parent();
			var tr = $("<tr>");
			var nextall = $(row).nextAll();
			//在上方插入行
			if(type == $table.constDa.INSERTROWUP){
				for(var i=nextall.length-1;i>=0; i--){
					$(nextall[i]).children().each(function(index, element) {
                        $table.tableop.modifyRowId(element,$table.constDa.IDADDVALUE);
                    });
				}
				$(row).children().each(function(index, element) {
                    $table.tableop.modifyRowId(element,$table.constDa.IDADDVALUE);
                });
				$(row).before(tr);
				for(var i=1; i<=$table.datas.totalCol; i++){
					$table.tableop.insertTd(tr,i,y);
				}
			//在下方插入行
			}else if(type == $table.constDa.INSERTROWDOWN){
				for(var i=nextall.length-1;i>=0; i--){
					$(nextall[i]).children().each(function(index, element) {
                        $table.tableop.modifyRowId(element,$table.constDa.IDADDVALUE);
                    });
				}
				$(row).after(tr);
				for(var i=1; i<=$table.datas.totalCol; i++){
					$table.tableop.insertTd(tr,i,y+1);
				}
			}
			$table.datas.totalRow = $table.datas.totalRow + 1;
		},
		//判断行是否含有合并的单元格
		justifyRowMerg:function(obj){
			var children = $($table.datas.startObj).parent().children();
			if(children.length < $table.datas.totalCol) return true;
			for(var i=0; i<children.length; i++){
				var colspan = parseInt($(children[i]).attr("colspan"));
				var rowspan = parseInt($(children[i]).attr("rowspan"));
				if(colspan>1 || rowspan>1){
					return true;	
				}
			}
		},
		
		//删除行这个修改不考虑合并的单元格
		deleteRow:function(){
			if($table.tableop.justifyRowMerg($table.datas.startObj)){
				//该行有合并的列，不能创建列
				alert("该行有合并的列，不能创建列");
				return;
			}
			var rows = $($table.datas.startObj).parent().nextAll();
			$($table.datas.startObj).parent().remove();
			$table.datas.startObj = null;
			for(var i=0; i<rows.length; i++){
				$(rows[i]).children().each(function(index, element) {
                    $table.tableop.modifyRowId($(element),$table.constDa.IDSUBVALUE);
                });
			}
			$table.datas.totalRow = $table.datas.totalRow - 1;
		},
		//修改列的id值这个修改不考虑合并的单元格
		modifyColId:function(col,type){
			var x = parseInt($(col).attr("x"));
			var y = parseInt($(col).attr("y"));
			//增加id值
			if(type == $table.constDa.IDADDVALUE){
				x ++;
			//减id值
			}else if(type == $table.constDa.IDSUBVALUE){
				x--;
			}
			$(col).attr("x",x);
			$(col).attr("id",x + "_" + y);
		},
		//修改行的id值这个修改不考虑合并的单元格
		modifyRowId:function(row,type){
			var x = parseInt($(row).attr("x"));
			var y = parseInt($(row).attr("y"));
			//增加行id值
			if(type == $table.constDa.IDADDVALUE){
				y++;
			//减行id值
			}else if(type == $table.constDa.IDSUBVALUE){
				y--;
			}
			$(row).attr("y",y);
			$(row).attr("id",x + "_" + y);
		}
	},
	
	//创建表
	createTable:function(col,row,parentId){
		$table.datas.totalCol = parseInt(col);
		$table.datas.totalRow = parseInt(row);
		var style = "border-collapse:collapse; width:100%;";
		var table = $("<table>");
		table.attr("style",style);
		table.attr("onmouseup","$table.mergeTable.selectMouseUp(this)");
		table.attr("align","center");
		$("#"+parentId).append(table);
		var tbody = $("<tbody>");
		table.append(tbody);
		for(var i=1; i<=row; i++){
			var tr = $("<tr>");
			tbody.append(tr);
			for(var j=1; j<=col; j++){
				$table.tableop.insertTd(tr,j,i);
			}
		}
		$table.setData.tableObj = table;
	},
	addElementToTd:function(ele){
		if(ele == null) return;
		$table.removeElementFromTd();
		$($table.datas.startObj).append($(ele));
	},
	removeElementFromTd:function(){
		$($table.datas.startObj).children().each(function(index, element) {
            $(element).remove();
        });
	},
	
	//修改表的宽度
	widthTable:function(width){
		var style = $($table.setData.tableObj).attr("style");
		style = $table.util.alterStyleAttr("width",width,style);
		$($table.setData.tableObj).attr("style",style);
	},
	
	//修改表的高度
	heightTable:function(height){
		var style = $($table.setData.tableObj).attr("style");
		style = $table.util.alterStyleAttr("height",height,style);
		$($table.setData.tableObj).attr("style",style);
	},
	
	//修改表的边框
	alterBorder:{
		//修改选中区域的上边框
		borderUp:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-top","1px solid #000",style);
					obj.attr("style",style);
				}
			}
		},
		//修改选中区域的上边框
		borderUp:function(ls,lt,lc){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-top",ls + " "+lt+" "+lc,style);
					obj.attr("style",style);
				}
			}
		},
		//修改选中区域的下边框
		borderDown:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-bottom","1px solid #000",style);
					obj.attr("style",style);
				}
			}
		},
		//修改选中区域的下边框
		borderDown:function(ls,lt,lc){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-bottom",ls + " "+lt+" "+lc,style);
					obj.attr("style",style);
				}
			}
		},
		//修改选中区域的左边框
		borderLeft:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-left","1px solid #000",style);
					obj.attr("style",style);
				}
			}
		},
		
		//修改选中区域的左边框
		borderLeft:function(ls,lt,lc){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-left",ls + " "+lt+" "+lc,style);
					obj.attr("style",style);
				}
			}
		},
		
		//修改选中区域的右边框
		borderRight:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-right","1px solid #000",style);
					obj.attr("style",style);
				}
			}
		},
		
		//修改选中区域的右边框
		borderRight:function(ls,lt,lc){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-right",ls + " "+lt+" "+lc,style);
					obj.attr("style",style);
				}
			}
		},
		
		//修改选中区域的边框
		borderAll:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-right","1px solid #000",style);
					style = $table.util.alterStyleAttr("border-top","1px solid #000",style);
					style = $table.util.alterStyleAttr("border-left","1px solid #000",style);
					style = $table.util.alterStyleAttr("border-bottom","1px solid #000",style);
					obj.attr("style",style);
				}
			}
		},
		
		//修改选中区域的边框
		borderAll:function(ls,lt,lc){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = obj.attr("style");
					style = $table.util.alterStyleAttr("border-right",ls + " "+lt+" "+lc,style);
					style = $table.util.alterStyleAttr("border-top",ls + " "+lt+" "+lc,style);
					style = $table.util.alterStyleAttr("border-left",ls + " "+lt+" "+lc,style);
					style = $table.util.alterStyleAttr("border-bottom",ls + " "+lt+" "+lc,style);
					obj.attr("style",style);
				}
			}
		}
	},
	
	//修改对齐方式
	alterAlign:{
		//水平左对齐
		levelLeft:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("align","left");
				}
			}
		},
		//水平居中对齐
		levelCenter:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("align","center");
				}
			}
		},
		//水平右对齐
		levelRight:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("align","right");
				}
			}
		},
		//垂直顶端对齐
		verticalTop:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("valign","top");
				}
			}
		},
		//垂直居中对齐
		verticalMiddle:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("valign","middle");
				}
			}
		},
		//垂直低端对齐
		verticalBottom:function(){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr("valign","bottom");
				}
			}
		}
	},
	
	//修改内容
	updateContent:{
		//修改字体
		modifyFontFraily:function(fontFamily){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr("font-family",fontFamily,style);
					$(obj).attr("style",style);
				}
			}
		},
		//修改字体的大小
		modifyFontSize:function(size){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr("font-size",size,style);
					$(obj).attr("style",style);
				}
			}
		},
		//修改字体的颜色
		modifyFontColor:function(color){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr(";color",color,style);
					$(obj).attr("style",style);
				}
			}
		},
		//修改字体的背景颜色
		modifyBgColor:function(color){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					obj.attr($table.constDa.TDBACKCOLOR,color);
				}
			}
		},
		//修改单元格的高度
		modifyTdHeight:function(height){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr("height",height,style);
					$(obj).attr("style",style);
				}
			}
		},
		//修改单元格的宽度
		modifyTdWidth:function(width){
			var minX = Math.min($table.datas.sectionX,$table.datas.sectionS);
			var maxX = Math.max($table.datas.sectionS,$table.datas.sectionX);
			var minY = Math.min($table.datas.sectionT,$table.datas.sectionY);
			var maxY = Math.max($table.datas.sectionT,$table.datas.sectionY);
			for(var i=minX; i<=maxX; i++){
				for(var j=minY; j<=maxY; j++){
					var obj = $("#" + i + "_" + j);
					var style = $(obj).attr("style");
					style = $table.util.alterStyleAttr("width",width,style);
					$(obj).attr("style",style);
				}
			}
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