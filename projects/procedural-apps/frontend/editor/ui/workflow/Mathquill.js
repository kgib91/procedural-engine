{
    oncreate: (vnode) => {
        var mathFieldSpan = $(vnode.dom).find('.math-field')[0];
        var latexSpan = $(vnode.dom).find('.latex')[0];
        var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField(mathFieldSpan, {
            spaceBehavesLikeTab: true,
            handlers: {
                edit: function() {
                    $(latexSpan).text(mathField.latex());
                    vnode.attrs.node.model = {
                        latex: mathField.latex()
                    }
                }
            }
        });
        if(vnode.attrs.node.model != null && vnode.attrs.node.model.latex != null) {
            mathField.latex(vnode.attrs.node.model.latex);
        }
    },
    view: (vnode) => {
        return m('div', [
            m('span', { class: 'math-field' }),
            m('span', { class: 'latex' })
        ]);
    }
}