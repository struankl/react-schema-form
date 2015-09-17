/**
 * Created by steve on 12/09/15.
 */
var React = require('react');
var { SchemaForm } = require('react-schema-form');
require('react-select/less/select.less');
var Select = require('react-select');
var $ = require('jquery');
var Ace = require('react-ace');


var ExamplePage = React.createClass({
    getInitialState: function() {
        return {
            tests: [
                { label: "Simple", value: 'data/simple.json' },
                { label: "Basic JSON Schema Type", value: 'data/types.json' },
                { label: "Bootstrap Grid", value: 'data/grid.json' },
                { label: "Complex Key Support", value: 'data/complex-keys.json' },
                { label: "Array", value: 'data/array.json' },
                { label: "Tab Array", value: 'data/tabarray.json' },
                { label: "TitleMap Examples", value: 'data/titlemaps.json' },
                { label: "Kitchen Sink", value: 'data/sink.json' }
            ],
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: '',
            itParsesSchema: true,
            itParsesForm: true
        };
    },

    onSelectChange: function(val) {
        //console.log("Selected:" + val);
        $.ajax({
            type: 'GET',
            url: val
        }).done(function(data) {
            //console.log('done', data);
            this.setState({
                schemaJson: JSON.stringify(data.schema, undefined, 2),
                formJson: JSON.stringify(data.form, undefined, 2),
                selected : val,
                schema: data.schema,
                model: {},
                form: data.form
            })
        }.bind(this));
    },

    onModelChange: function(model) {
        console.log('onModelChange:', model);
        this.setState({model: model});
    },
    onFormChange: function(val) {
        //console.log("onFormChange:" + val);
    },

    onSchemaChange: function(val) {
        //console.log("onSchemaChange:" + val);
    },

    render: function() {

        var schemaForm = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} onModelChange={this.onModelChange} />
            )
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model,undefined,2,2)}</pre>
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <div className="form-group">
                            <Select
                                name="selectTest"
                                value={this.state.selected}
                                options={this.state.tests}
                                onChange={this.onSelectChange}>
                            </Select>
                        </div>
                        <h3>Form</h3>
                        <Ace mode="json" theme="github" onChange={this.onFormChange} name="aceForm" value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <Ace mode="json" theme="github" onChange={this.onSchemaChange} name="aceSchema" value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ExamplePage;

