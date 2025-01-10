import {  useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input'; // Adjust imports based on your libraries
import { Button } from '@/components/ui/button'; // Adjust imports based on your libraries
import { createTransactionInFirebase } from './createTransactionInFirebase'; // Adjust path based on where your firebase transaction function is
const TransactionForm = ({uid}:{uid:string}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [tAmount, setTamount] = useState('');
  const [error2, setError2] = useState('');

  const [success2, setSuccess2] = useState('');

  const createATransaction = async (e:any) => {
    e.preventDefault();

    // Validate fields
    if (!name || !type || !date || !tAmount) {
      setError2('Please fill out all fields.');
      return;
    }

    try {
      // Call the Firebase function to create the transaction
      await createTransactionInFirebase({
        name,  // Here we assume the transaction name is based on transactionDetail
        type,
        tamount: parseInt(tAmount, 10),
        date, // Current date in YYYY-MM-DD format
        docref:uid
      });

      setSuccess2('Transaction successfully created!');
      
      // Reset the form
      setName('');
      setType('');
      setDate('');
      setTamount('');
    } catch (error:any) {
      setError2(error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="text-blue-500">Add Transaction</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Transaction</SheetTitle>
          <SheetDescription>Complete all Fields</SheetDescription>
        </SheetHeader>

        <form className="mb-4 pt-10 flex flex-col gap-y-5" onSubmit={createATransaction}>
          {error2 && <div className="text-red-500">{error2}</div>}
          {success2 && <div className="text-green-600">{success2}</div>}

          <Input
            placeholder="Coin Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Deposit or Withdrawal or Trade"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Input
            placeholder="e.g 06 Jan 2022"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            placeholder="e.g -1000 or 1000"
            type="number"
            value={tAmount}
            onChange={(e) => setTamount(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionForm;
