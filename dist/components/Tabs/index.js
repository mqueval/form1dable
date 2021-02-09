"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Data_1 = __importDefault(require("../Data"));
const Bar_1 = __importDefault(require("./Bar"));
const Tabs = ({ barClassName, barItemClassName, className, formName, datas, params, tabs, }) => {
    const [tab, setTab] = react_1.useState(0);
    const [infos, setInfos] = react_1.useState([]);
    const newDatas = react_1.useMemo(() => (datas && !Array.isArray(datas) ? [datas] : datas), [datas]);
    console.info('tabs', tabs);
    react_1.useEffect(() => {
        let newTab = 0;
        if (window && window.location && window.location.search) {
            const search = {};
            window.location.search
                .slice(1)
                .split('&')
                .forEach(option => {
                const [key, value] = option.split('=');
                search[key] = value;
            });
            if (search.page) {
                newTab = parseInt(search.page, 10);
            }
        }
        setTab(newTab);
    }, []);
    react_1.useEffect(() => {
        if (newDatas) {
            const newInfos = newDatas.map((newData, i) => ({
                isActive: tab === i,
                title: 'string' === typeof tabs[i]
                    ? tabs[i]
                    : tabs[i].name,
            }));
            console.info('newInfos', newInfos);
            setInfos(newInfos);
        }
    }, [newDatas, tab, tabs]);
    const handleButtonOnClick = (event) => {
        const newTab = event.currentTarget.getAttribute('data-tab');
        if (newTab) {
            setTab(parseInt(newTab, 10));
        }
    };
    return (react_1.default.createElement("div", { className: classnames_1.default(className, 'w-full') },
        react_1.default.createElement(Bar_1.default, { className: barClassName, handleButtonOnClick: handleButtonOnClick, infos: infos, itemClassName: barItemClassName }),
        newDatas && newDatas.length > tab && (react_1.default.createElement(Data_1.default, Object.assign({}, newDatas[tab], { formName: formName, params: params })))));
};
exports.default = Tabs;
