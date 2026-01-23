import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';
import parserPostcss from 'prettier/plugins/postcss';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import { CodeType } from '../types';

export const formatCode = async (code: string, language: CodeType) => {
  try {
    let parser = 'html';
    let plugins = [parserHtml];

    if (language === 'css') {
      parser = 'css';
      plugins = [parserPostcss];
    } else if (language === 'js') {
      parser = 'babel';
      plugins = [parserBabel, parserEstree];
    }

    const formatted = await prettier.format(code, {
      parser,
      plugins,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    });

    // Prettier often adds a newline at the end, which is fine, 
    // but sometimes in small inputs it might feel excessive. Keeping standard behavior.
    return formatted;
  } catch (error) {
    console.warn('Prettier formatting failed:', error);
    // Return original code if formatting fails (e.g., syntax error)
    return code;
  }
};
