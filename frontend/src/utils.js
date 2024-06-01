export const calculateBalances = (transactions) => {
    const personalBalances = {};
    const groupBalances = {};

    transactions.forEach(({ sender, receivers, amount, type }) => {
        const balances = type === 'personal' ? personalBalances : groupBalances;

        receivers.forEach(receiver => {
            if (sender !== receiver) {
                if (!balances[sender]) balances[sender] = {};
                if (!balances[receiver]) balances[receiver] = {};

                const splitAmount = amount / receivers.length;

                if (!balances[sender][receiver]) balances[sender][receiver] = 0;
                if (!balances[receiver][sender]) balances[receiver][sender] = 0;

                balances[sender][receiver] += splitAmount;
                balances[receiver][sender] -= splitAmount;
            }
        });
    });

    return { personalBalances, groupBalances };
};
