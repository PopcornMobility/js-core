import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import * as React from 'react';
import { RawIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import english from "../../../locales/en";
import romanian from "../../../locales/ro";
import ukrainean from "../../../locales/uk";
import russian from "../../../locales/ru";
import { IntlSetup } from "./intlSetup";
const defaultLocale = {
  en: english,
  ro: romanian,
  uk: ukrainean,
  ru: russian
};

const mapStateToProps = ({
  settings
}) => ({
  lang: settings.locale
});

const Localization = props => {
  const {
    children,
    lang,
    locales
  } = props;
  const CoreLocale = defaultLocale[lang] || english;

  const processMessages = messages => {
    const reindexedMessages = {};
    Object.values(messages).forEach(chunk => {
      Object.keys(chunk).forEach(language => {
        reindexedMessages[language] = { ...reindexedMessages[language],
          ...chunk[language]
        };
      });
    });
    return reindexedMessages;
  };

  const ModuleLocale = processMessages(locales);
  const AppLocale = { ...CoreLocale.messages,
    ...ModuleLocale[lang]
  };
  const intl = IntlSetup({
    locale: lang,
    messages: AppLocale
  });
  return /*#__PURE__*/React.createElement(_ConfigProvider, {
    locale: CoreLocale.antdData
  }, /*#__PURE__*/React.createElement(RawIntlProvider, {
    value: intl
  }, children));
};

export default connect(mapStateToProps)(Localization);