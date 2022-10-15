class HorBarChart {
    constructor(_data) {
        this.data = _data;
        this.numOfBars;


        this.title = "Quality of Life by Country";
        this.titleFontSize = 20;



        this.xAxisTitle = "Quality of Life Index Score";
        this.yAxisTitle = "Countries"
        this.axisTitleFontSize = 16;
        this.tickFontSize = 14;

        this.chartWidth = 300;
        this.chartHeight = 300;
        this.spacing = 5;
        this.margin = 30;
        this.numTicks = 10;
        this.tickIncrements;
        this.maxValue;
        this.numPlaces = 0;

        this.tickSpacing;
        this.barWidth;
        this.availableWidth;

        //Controls
        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = true;
        this.drawTrendLine = true;

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
        this.lineColour = (33, 37, 41);
        this.fontColor = (33, 37, 41);
        this.tickColor = (33, 37, 41);
        this.strokeThickness = 1;
        this.fontSize = 10;
        this.vertLineColour = 215, 219, 222;


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
            return x.QualityofLifeIndex
        })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {

        push()
        translate(this.posX, this.posY);

        this.drawTitle();
        this.drawTicks();
        this.drawVerticalLines();
        this.drawRects();
        this.drawAxis();
        this.drawMovingLine();
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
        text(this.xAxisTitle, this.chartWidth / 2, this.chartHeight / 2 - 100)

        //Y Axis Title
        push()
        rotate(PI / -2)
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.yAxisTitle, this.chartWidth / 2, -85)
        pop()

    }

    scaleData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawAxis() {
        //chart
        stroke(this.lineColour);
        strokeWeight(this.strokeThickness);
        line(0, 0, 0, -this.chartHeight); //y
        line(0, 0, this.chartWidth, 0); //x
    }

    drawTicks() {
        for (let i = 0; i <= this.numTicks; i++) {
            //ticks
            stroke(this.tickColor);
            strokeWeight(this.strokeThickness)
            line(this.tickSpacing * i, 0, this.tickSpacing * i, 20);

            //numbers (text)
            if (this.showValues) {
                fill(this.fontColor);
                noStroke();
                textSize(this.tickFontSize);
                textAlign(CENTER, CENTER);
                text((i * this.tickIncrements).toFixed(this.numPlaces), this.tickSpacing * i, 30);
            }
        }
    }

    drawVerticalLines() {
        for (let i = 0; i <= this.numTicks; i++) {

            //Vertical line
            stroke(this.vertLineColour);
            strokeWeight(1)
            line(this.tickSpacing * i, 0, this.tickSpacing * i, -this.chartWidth);


        }
    }

    drawMovingLine() {
        if (this.drawTrendLine) {
            push();
            translate(0, -this.margin);
            noFill()
            stroke(0)
            strokeWeight(1)
            beginShape();
            for (let i = 0; i < this.numOfBars; i++) {
                ellipse(this.scaleData(this.data[i].QualityofLifeIndex) / 2, ((this.barWidth + this.spacing) * -i) - this.barWidth / 2, 2);
                vertex(this.scaleData(this.data[i].QualityofLifeIndex) / 2, ((this.barWidth + this.spacing) * -i) - this.barWidth / 2);
            }
            endShape();
            pop();
        }
    }

    drawRects() {
        push();
        translate(0, -this.margin);
        for (let i = 0; i < this.numOfBars; i++) {
            let colorNumber = i % 10;

            //bars
            fill(this.colors[colorNumber]);
            noStroke();


            rect(0, (this.barWidth + this.spacing) * -i, this.scaleData(this.data[i].QualityofLifeIndex), -this.barWidth);

            //numbers (text)
            noStroke();
            fill(this.fontColor)
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            text(this.data[i].QualityofLifeIndex, this.scaleData(this.data[i].QualityofLifeIndex) + 5, ((this.barWidth + this.spacing) * -i) - this.barWidth / 2);

            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push()
                    noStroke();
                    textSize(this.tickFontSize);
                    textAlign(RIGHT, CENTER);
                    translate(-10, ((this.barWidth + this.spacing) * -i) - this.barWidth / 2);
                    rotate(PI / 4)
                    fill(this.fontColor)
                    text(this.data[i].country, 0, 0);
                    pop()
                } else {

                    noStroke();
                    fill(this.fontColor)
                    textSize(this.tickFontSize);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].country, -30, (-(this.barWidth + this.spacing) * i) + this.barWidth / 2);
                }
            }


        }
        pop()
    }
}