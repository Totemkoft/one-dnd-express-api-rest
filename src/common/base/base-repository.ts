import { ClientSession, Document, FilterQuery, Model, QueryOptions, Types, UpdateQuery, UpdateWithAggregationPipeline, UpdateWriteOpResult } from "mongoose";

export class BaseRepository<T extends Document> {

    private model: Model<T>;

    constructor(model: Model<T>){
        this.model = model;
    }

    public async findAll(options: QueryOptions = {}) : Promise<T[]> {
        return await this.model.find({}, null, options).exec();
    }

    public async find(query: FilterQuery<T>, options: QueryOptions = {}) : Promise<T[]> {
        return await this.model.find(query, null, options).exec();
    }

    public async findById(id: Types.ObjectId, options: QueryOptions = {}) : Promise<T | null> {
        return await this.model.findById(id, null, options).exec();
    }

    public async findOne(query: FilterQuery<T>, options: QueryOptions = {}) : Promise<T | null> {
        return await this.model.findOne(query, null, options).exec();
    }

    public async aggregate(pipeline: any[]): Promise<any[]> {
        return await this.model.aggregate(pipeline).exec();
    }

    public async createOne(data: Partial<T>, options: QueryOptions = {} , session?: ClientSession) : Promise<T> {
        return this.model.create([data], { ...options, session}).then((result) => result[0]);
    } 

    public async insertMany(data: Partial<T>[], session?: ClientSession){
        const documents = await this.model.insertMany(data, {ordered: true, session });
        return documents;
      }

    public async update(query: FilterQuery<T>, update: UpdateQuery<T>, options: QueryOptions = {}, session?: ClientSession) : Promise<T | null> {
        return await this.model.findOneAndUpdate(query, update, { ...options, session}).exec();
    }

    public async updateMany(query: FilterQuery<T>, update: UpdateQuery<T> | UpdateWithAggregationPipeline , options?: QueryOptions, session?: ClientSession): Promise<UpdateWriteOpResult | null> {
        return await this.model.updateMany(query, update,  { options, new: true, session}).exec();
    }

    public async deleteById(id: string | Types.ObjectId, options: QueryOptions = {}, session?: ClientSession) : Promise<T | null> {
       return await this.model.findByIdAndDelete(id, {...options, session}).exec();
    }

    public async deleteOne(query: FilterQuery<T>, options: QueryOptions = {}, session?: ClientSession): Promise<T | null> {
        return await this.model.findOneAndDelete(query, {...options, session}).exec();   
    }

    public async deleteMany(query: FilterQuery<T>, session?: ClientSession) : Promise<void> {
        await this.model.deleteMany(query, {session}).exec();
    }

    public async paginatedSearch(query: FilterQuery<T>, limit: number, language: string, strength: number, sort?: any, skip?: any) : Promise<T[]> {
        return await this.model.find(query, null).sort(sort ? { ...sort, _id: 1 } : null).skip(skip ? skip : null).limit(limit).collation({ locale: language, strength: strength }).exec();
    }

    public async updateOne(query: FilterQuery<T>, update: UpdateQuery<T> | UpdateWithAggregationPipeline , options?: QueryOptions, session?: ClientSession): Promise<UpdateWriteOpResult | null> {
        return await this.model.updateOne(query, update, { options, new: true, session}).exec();
    }

    public async bulkWrite(operations: any[], options?: { session?: ClientSession; ordered?: boolean }): Promise<void> {
        await this.model.bulkWrite(operations,  options);
    }
}
