import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Testing'); 

  switch (req.method) {
    case 'GET':
      const todos = await db.collection('dataset').find({}).toArray();
      res.status(200).json({ success: true, data: todos });
      break;

    case 'POST':
      const { title } = req.body;
      if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

      const newTodo = await db.collection('dataset').insertOne({ title, completed: false });
      res.status(201).json({ success: true, data: newTodo.ops[0] });
      break;

    case 'DELETE':
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, message: 'ID is required' });

      await db.collection('dataset').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ success: true, message: 'Todo deleted' });
      break;

    case 'PUT':
      const { id: updateId, title: newTitle } = req.body;
      if (!updateId || !newTitle) return res.status(400).json({ success: false, message: 'ID and Title are required' });

      await db.collection('items').updateOne({ _id: new ObjectId(updateId) }, { $set: { title: newTitle } });
      res.status(200).json({ success: true, message: 'Todo updated' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
