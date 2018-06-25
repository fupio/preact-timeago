'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var timeago = require('timeago.js');

var TimeAgo = function (_Component) {
    _inherits(TimeAgo, _Component);

    function TimeAgo() {
        _classCallCheck(this, TimeAgo);

        return _possibleConstructorReturn(this, (TimeAgo.__proto__ || Object.getPrototypeOf(TimeAgo)).apply(this, arguments));
    }

    _createClass(TimeAgo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.instance = timeago();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderTimeAgo();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderTimeAgo();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.instance.cancel();
        }
    }, {
        key: 'renderTimeAgo',
        value: function renderTimeAgo() {
            var _props = this.props,
                datetime = _props.datetime,
                _props$live = _props.live,
                live = _props$live === undefined ? false : _props$live;


            this.instance.cancel();

            if (!this.base || live === false) return;

            // When used in combination with jsdom for headless testing, we need to ensure that
            // `dataset` exists on the base until https://github.com/tmpvar/jsdom/issues/961 is
            // resolved, as under the covers timeago.js checks `dataset` before `getAttribute`.
            //
            // TODO: pull request timeago.js to reorder checks on `getAttribute`/`dataset`.
            if (typeof this.base.dataset == 'undefined') {
                this.base.dataset = {};
            }

            this.base.setAttribute('datetime', datetime.getTime ? datetime.getTime() : datetime);
            this.instance.render(this.base);
        }
    }, {
        key: 'render',
        value: function render(props) {
            return h('time', { 'class': props.class }, this.instance.format(props.datetime));
        }
    }]);

    return TimeAgo;
}(Component);

module.exports = TimeAgo;
