import { Block, Condition, Group, Line, Literal, SyntaxNode, Word } from '@inferred/parser';

export interface QueryBlock
  extends Block<{
    '"""': BlockCommentSyntax;
    '#': CommentSyntax;
    query: QuerySyntax;
    mutation: MutationSyntax;
    subscription: SubscriptionSyntax;
    fragment: FragmentSyntax;
  }> {
  end: '';
}

interface Directive
  extends SyntaxNode<
    'Directive',
    [
      { name: '@'; kind: Literal<'@'> },
      { name: 'name'; kind: Word<' ' | '\n' | '('> },
      { name: 'args'; kind: Arguments; optional: true },
    ]
  > {}

interface Arguments extends Block<{}, Argument> {
  end: ')';
  start: '(';
  separator: ',';
}

interface Argument
  extends SyntaxNode<
    'Argument',
    [{ name: 'name'; kind: Word<' ' | '\n' | ':' | ')'> }, { name: 'value'; kind: ArgumentValue }]
  > {}

interface ArgumentValue
  extends SyntaxNode<
    'ArgumentValue',
    [{ name: ':'; kind: ColonSyntax }, { name: 'value'; kind: Word<',' | ')'> }]
  > {}

interface CommentSyntax
  extends SyntaxNode<
    'Comment',
    [{ name: 'kind'; kind: Literal<'#'> }, { name: 'body'; kind: Line }]
  > {}

interface EqualsSyntax extends Literal<'='> {}

interface ColonSyntax extends Literal<':'> {}

interface BlockCommentSyntax
  extends SyntaxNode<'BlockComment', [{ name: 'body'; kind: Group<'"""', '"""'> }]> {}

interface FieldArguments extends Block<{}, InputFieldDefinition> {
  end: ')';
  start: '(';
  separator: ',';
}

interface DefaultValue
  extends SyntaxNode<
    'DefaultValue',
    [{ name: '='; kind: EqualsSyntax }, { name: 'value'; kind: Word<',' | ')' | '@'> }]
  > {}

interface InputFieldDefinition
  extends SyntaxNode<
    'InputFieldDefinition',
    [
      { name: 'name'; kind: Word<' ' | '\n' | ':' | ')'> },
      { name: ':'; kind: ColonSyntax },
      { name: 'type'; kind: Word<' ' | '\n' | ',' | ')'> },
      { name: 'default'; kind: DefaultValue; optional: true },
      { name: 'directives'; kind: Directive; repeat: true },
    ]
  > {}

interface QuerySyntax
  extends SyntaxNode<
    'Query',
    [
      { name: 'kind'; kind: Literal<'query'> },
      { name: 'name'; kind: Word<' ' | '\n' | '(' | '{'>; optional: true },
      { name: 'variables'; kind: FieldArguments; optional: true },
      { name: 'body'; kind: QueryBody },
    ]
  > {}

interface MutationSyntax
  extends SyntaxNode<
    'Query',
    [
      { name: 'kind'; kind: Literal<'mutation'> },
      { name: 'name'; kind: Word<' ' | '\n' | '(' | '{'>; optional: true },
      { name: 'variables'; kind: FieldArguments; optional: true },
      { name: 'body'; kind: QueryBody },
    ]
  > {}

interface SubscriptionSyntax
  extends SyntaxNode<
    'Subscription',
    [
      { name: 'kind'; kind: Literal<'subscription'> },
      { name: 'name'; kind: Word<' ' | '\n' | '(' | '{'>; optional: true },
      { name: 'variables'; kind: FieldArguments; optional: true },
      { name: 'body'; kind: QueryBody },
    ]
  > {}

interface QueryBody
  extends Block<
    {
      '"""': BlockCommentSyntax;
      '#': CommentSyntax;
      '...': FragmentSpread;
    },
    FieldSelection
  > {
  end: '}';
  start: '{';
}

interface FieldAlias
  extends SyntaxNode<
    'FieldAlias',
    [{ name: 'alias'; kind: Word<' ' | '\n' | ':'> }, { name: ':'; kind: ColonSyntax }]
  > {}

interface FieldSelection
  extends SyntaxNode<
    'FieldSelection',
    [
      { name: 'alias'; kind: FieldAlias; optional: true },
      { name: 'name'; kind: Word<' ' | '\n' | ':' | '(' | ' {' | '}'> },
      { name: 'args'; kind: Arguments; optional: true },
      { name: 'selections'; kind: QueryBody; optional: true },
    ]
  > {}

interface FragmentSyntax
  extends SyntaxNode<
    'Fragment',
    [
      { name: 'kind'; kind: Literal<'fragment'> },
      { name: 'name'; kind: Word<' ' | '\n'> },
      { name: 'on'; kind: Literal<'on'> },
      { name: 'type'; kind: Word<' ' | '\n' | '{'> },
      { name: 'body'; kind: QueryBody },
    ]
  > {}

interface FragmentSpread
  extends SyntaxNode<
    'FragmentSpread',
    [
      { name: '...'; kind: Literal<'...'> },
      { name: 'fragment'; kind: Condition<`on ${string}`, InlineFragment, Word<' ' | '\n' | '}'>> },
    ]
  > {}

interface InlineFragment
  extends SyntaxNode<
    'InlineFragment',
    [
      { name: 'on'; kind: Literal<'on'> },
      { name: 'type'; kind: Word<' ' | '\n' | '{'> },
      { name: 'body'; kind: QueryBody },
    ]
  > {}
