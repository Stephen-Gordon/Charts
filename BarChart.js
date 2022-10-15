class BarChart {
    constructor(_data) {
        this.data = _data;
        this.numOfBars;

        this.title = "Pollution by Country";
        this.titleFontSize = 20;

        this.xAxisTitle = "Countries";
        this.yAxisTitle = "Pollution Index Score"
        this.axisTitleFontSize = 16;

        this.chartWidth;
        this.chartHeight;
        this.spacing = 5;
        this.margin = 30;
        this.numTicks = 10;
        this.numPlaces = 0;

        this.posX;
        this.posY;

        //Controls
        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = true;
        this.drawTrendLine = true;


        this.maxValue;

        this.tickSpacing;
        this.barWidth;
        this.availableWidth;



        this.colors = [
            color(113, 114, 173),
            color(80, 158, 227),
            color(239, 140, 140),
            color(156, 193, 119),
            color(217, 85, 85),
            color(217, 151, 85),
            color(181, 72, 36),
            color(242, 125, 22),
            color(236, 181, 82),
            color(50, 148, 218)
        ];

        this.horLineColour = 215, 219, 222;
        this.lineColour = (33, 37, 41)
        this.fontColor = (33, 37, 41);
        this.tickColor = (33, 37, 41);
        this.strokeThickness = 1;
        this.fontSize = 10;

        this.updateValues();
        this.calculateMaxValue();
    }

    updateGuiVals(numBars) {
        this.numOfBars = numBars;
    }

    updateValues() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.availableWidth = this.chartWidth - (this.margin * 2) - (this.spacing * (this.numOfBars - 1));
        this.barWidth = this.availableWidth / this.numOfBars;
    }

    calculateMaxValue() {
        let listValues = this.data.map(function (x) {
            return x.PollIndex
        })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {

        push()
        translate(this.posX, this.posY);

        this.drawTitle();
        this.drawTicks();
        this.drawHorizontalLines();
        this.drawRects();
        this.drawAxis();
        this.drawMovingLine()
        pop()
    }

    drawTitle() {
        //Main Title
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.title, this.chartWidth / 2, -this.chartHeight - 20)

        //X Axis Title
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.xAxisTitle, this.chartWidth / 2, this.chartHeight / 2 - 50)

        //Y Axis Title
        push()
        rotate(PI / -2)
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.yAxisTitle, this.chartWidth / 2, -50)
        pop()

    }

    scaleData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawAxis() {
        //chart
        stroke(this.lineColour);
        strokeWeight(1);
        line(0, 0, 0, -this.chartHeight); //y
        line(0, 0, this.chartWidth, 0); //x
    }

    drawTicks() {
        for (let i = 0; i <= this.numTicks; i++) {
            //ticks
            stroke(this.tickColor);
            strokeWeight(1)
            line(0, this.tickSpacing * -i, -10, this.tickSpacing * -i);

            //numbers (text)
            if (this.showValues) {
                fill(this.fontColor);
                noStroke();
                textSize(14);
                textAlign(RIGHT, CENTER);
                text((i * this.tickIncrements).toFixed(this.numPlaces), -15, this.tickSpacing * -i);
            }
        }
    }



    drawHorizontalLines() {
        for (let i = 0; i <= this.numTicks; i++) {

            //horizontal line
            stroke(this.horLineColour);
            strokeWeight(1)
            line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
        }
    }


    drawMovingLine() {
        if(this.drawTrendLine){
            push();
            translate(this.margin, 0);
            noFill()
            stroke(0)
            strokeWeight(1)
            beginShape();
    
    
            for (let i = 0; i < this.numOfBars; i++) {
                ellipse(((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaleData(-this.data[i].PollIndex) / 2, 2);
                vertex(((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaleData(-this.data[i].PollIndex) / 2);
            }
            endShape();
            pop();
        }
        
    }



    drawRects() {
        push();
        translate(this.margin, 0);

        for (let i = 0; i < this.numOfBars; i++) {
            let colorNumber = i % 10;

            //bars
            fill(this.colors[colorNumber]);
            noStroke();
            rect((this.barWidth + this.spacing) * i, 0, this.barWidth, this.scaleData(-this.data[i].PollIndex));

            //numbers (text)
            noStroke();
            fill(this.fontColor)
            textSize(this.fontSize);
            textAlign(CENTER, CENTER)
            text(this.data[i].PollIndex, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaleData(-this.data[i].PollIndex) - 10);


            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push()
                    noStroke();
                    textSize(14);
                    textAlign(LEFT, CENTER);
                    translate(((this.barWidth + this.spacing) * i) + this.barWidth / 2, 10);
                    rotate(PI / 4)
                    fill(this.fontColor)
                    text(this.data[i].country, 0, 0);
                    pop()
                } else {

                    noStroke();
                    fill(this.fontColor)
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].country, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, 20);
                }
            }


        }

        pop()
    }
}