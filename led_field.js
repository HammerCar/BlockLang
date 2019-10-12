'use strict';

goog.provide('CustomFields.LEDField');
goog.require('Blockly.Field');

CustomFields.LEDField = function(opt_value, opt_validator) {
    opt_value = this.doClassValidation_(opt_value);
    if (opt_value === null || opt_value === undefined) {
        opt_value = {
            count: 0,
            leds: []
        };
        for (let x = 0; x < 16; x++) {
            opt_value.leds[x] = [];
            for (let y = 0; y < 16; y++) {
                opt_value.leds[x][y] = { value: false }
            }
        }
    }  // Else the original value is fine.

    CustomFields.LEDField.superClass_.constructor.call(this, opt_value, opt_validator);
};
goog.inherits(CustomFields.LEDField, Blockly.Field);

CustomFields.LEDField.prototype.SERIALIZABLE = true;
CustomFields.LEDField.prototype.size = 250;

CustomFields.LEDField.fromJson = function(options) {
    var value = Blockly.utils.replaceMessageReferences(
        options['value']);
    return new CustomFields.LEDField(value);
};

CustomFields.LEDField.prototype.initView = function() {
    CustomFields.LEDField.superClass_.initView.call(this);
};

CustomFields.LEDField.prototype.render_ = function() {
    this.textContent_.nodeValue = this.value_.count;
    this.updateSize_();
};

CustomFields.LEDField.prototype.showEditor_ = function() {
    // Create the widget HTML
    this.editor_ = this.dropdownCreate_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);
  
    // Set the dropdown's background colour.
    // This can be used to make it match the colour of the field.
    Blockly.DropDownDiv.setColour('white', 'silver');
  
    // Show it next to the field. Always pass a dispose function.
    Blockly.DropDownDiv.showPositionedByField(this, this.disposeWidget_.bind(this));
};

CustomFields.LEDField.prototype.dropdownCreate_ = function() {
    var svg = Blockly.utils.dom.createSvgElement('svg', {
        'xmlns': Blockly.utils.dom.SVG_NS,
        'xmlns:html': Blockly.utils.dom.HTML_NS,
        'xmlns:xlink': Blockly.utils.dom.XLINK_NS,
        'version': '1.1',
        'height': this.size + 'px',
        'width': this.size + 'px'
    }, null);

    for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
            this.value_.leds[x][y].element = Blockly.utils.dom.createSvgElement('rect',
            {
                'class': 'led',
                'x': x * (this.size / 16) + 1,
                'y': y * (this.size / 16) + 2,
                'width': (this.size / 16) - 2.5,
                'height': (this.size / 16) - 2.5,
                'stroke': 'black',
                'stroke-width': '1',
                'fill': this.value_.leds[x][y].value ? 'white' : 'black'
            }, svg);

            let ledObject = this;
            let ledValueChange = function() {
                ledObject.value_.leds[x][y].value = !ledObject.value_.leds[x][y].value;
                ledObject.value_.leds[x][y].element.setAttribute("fill", ledObject.value_.leds[x][y].value ? 'white' : 'black');

                let count = 0;
                for (let x = 0; x < 16; x++)
                    for (let y = 0; y < 16; y++)
                        if (ledObject.value_.leds[x][y].value)
                            count++;

                ledObject.setValue({ count: count, leds: ledObject.value_.leds });
            }

            this.value_.leds[x][y].element.addEventListener('mouseover', function(e) {
                if (e.buttons === 1 && ledObject.drawing_ != ledObject.value_.leds[x][y].value) {
                    ledValueChange();
                }
            });

            this.value_.leds[x][y].element.addEventListener('mousedown', function(e) {
                if (e.buttons === 1) {
                    ledValueChange();

                    ledObject.drawing_ = ledObject.value_.leds[x][y].value;
                }
            });
        }
    }
  
    return svg;
};

CustomFields.LEDField.prototype.disposeWidget_ = function() {
    
};

CustomFields.LEDField.prototype.toXml = function(fieldElement) {
    fieldElement.setAttribute('leds', JSON.stringify(this.value_.leds));
    fieldElement.textContent = this.value_.count;

    return fieldElement;
};
  
CustomFields.LEDField.prototype.fromXml = function(fieldElement) {
    let value = {}

    value.leds = JSON.parse(fieldElement.getAttribute('leds'));
    value.count = fieldElement.textContent

    this.setValue(value);
};

Blockly.Field.register('field_led', CustomFields.LEDField);
