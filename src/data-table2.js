dc.dataTable2 = function(parent, chartGroup) {
    var LABEL_CSS_CLASS = "dc-table-label";
    var ROW_CSS_CLASS = "dc-table-row";
    var COLUMN_CSS_CLASS = "dc-table-column";
    var GROUP_CSS_CLASS = "dc-table-group";

    var _chart = dc.baseChart({});

    var _size = 25;
    var _columns = [];
    var _keep = function(d) {
        return d;
    };
    var _order = d3.ascending;

    _chart.doRender = function() {
        _chart.selectAll("tbody").remove();
        renderRows();

        return _chart;
    };

    function renderRows() {
        var entries = _chart.group().top(Infinity);
        var max = Math.min(_size,entries.length);
        while (max>0) {
            if(!_keep(entries[max-1]))
                max--;
            else break;
        }
        entries = max ? _chart.group().top(max) : [];

        var body = _chart.root().append("tbody");
        var rows = body.selectAll("tr." + ROW_CSS_CLASS)
            .data(entries);

        var rowEnter = rows.enter()
            .append("tr")
            .attr("class", ROW_CSS_CLASS)
            .each(function(d) {
                for (var i = 0; i < _columns.length; ++i) {
                    var f = _columns[i];
                    d3.select(this).append("td")
                    .attr("class", COLUMN_CSS_CLASS + " _" + i)
                    .html(f(d));
                }
            });

        rows.exit().remove();
    }

    _chart.doRedraw = function() {
        return _chart.doRender();
    };

    _chart.size = function(s) {
        if (!arguments.length) return _size;
        _size = s;
        return _chart;
    };

    _chart.columns = function(_) {
        if (!arguments.length) return _columns;
        _columns = _;
        return _chart;
    };

    _chart.keep = function(_) {
        if (!arguments.length) return _keep;
        _keep = _;
        return _chart;
    };

    _chart.order = function(_) {
        if (!arguments.length) return _order;
        _order = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};
