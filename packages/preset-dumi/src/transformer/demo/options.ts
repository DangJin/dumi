import ctx from '../../context';

export interface IDemoOpts {
  isTSX: boolean;
  fileAbsPath: string;
}

export const getBabelOptions = ({ isTSX, fileAbsPath }: IDemoOpts) => ({
  // rename filename.md to filename.tsx to prevent babel transform failed
  filename: isTSX ? fileAbsPath.replace(/\.\w+$/, '.tsx') : fileAbsPath,
  presets: [
    [require.resolve('@umijs/babel-preset-umi/app'), { reactRequire: false, typescript: isTSX }],
    ...(ctx.umi?.config?.extraBabelPresets || []),
  ],
  plugins: [
    [require.resolve('@babel/plugin-transform-modules-commonjs'), { strict: true }],
    ...(ctx.umi?.config?.extraBabelPlugins || []),
  ],
  ast: true,
  babelrc: false,
  configFile: false,
});
