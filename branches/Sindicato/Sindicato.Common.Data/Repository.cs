using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Metadata.Edm;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Sindicato.Common.Data.Interfaces;

namespace Sindicato.Common.Data
{
    public class Repository<TEntity> : IRepository<TEntity>, IDisposable
        where TEntity : EntityObject
    {
        private readonly ObjectContext _ctx;

        private string _keyProperty = "ID";

        public string KeyProperty
        {
            get
            {
                return _keyProperty;
            }
            set
            {
                _keyProperty = value;
            }
        }

        public ObjectContext Context
        {
            get { return _ctx; }
        }

        public Repository(IUnitOfWork unitOfWork)
        {
            if (unitOfWork == null)
                throw new ArgumentNullException("unitOfWork");
            _ctx = unitOfWork.Context;
        }
        public int ObtenerSecuencia()
        {
            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            ObjectParameter p_COD_TABLAParameter = new ObjectParameter("P_COD_TABLA", typeof(TEntity).Name);
            ObjectParameter p_ID_USRParameter = new ObjectParameter("P_ID_USR", 0);
            _ctx.ExecuteFunction("P_EE_SECUENCIA", p_COD_TABLAParameter, p_ID_USRParameter, p_RES);
            return Convert.ToInt32(p_RES.Value);
        }

        public int ObtenerNumeroPorGestion(string campoNumero)
        {
            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            ObjectParameter p_TABLAParameter = new ObjectParameter("P_TABLA", typeof(TEntity).Name);
            ObjectParameter p_COLUMNAParameter = new ObjectParameter("P_COLUMNA", campoNumero);
            _ctx.ExecuteFunction("P_SD_OBTENER_NRO", p_TABLAParameter, p_COLUMNAParameter, p_RES);
            return Convert.ToInt32(p_RES.Value);
        }

        public int ObtenerGestion()
        {
            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            _ctx.ExecuteFunction("P_SD_OBTENER_GESTION", p_RES);
            return Convert.ToInt32(p_RES.Value);
        }

        #region IRepository<E> Members

        public int Save()
        {
            return _ctx.SaveChanges();
        }
        /// <summary>
        /// Metodo generico que retorna todas las entidades del tipo TEntity
        /// </summary>
        /// <param name="entitySetName">
        /// El nombre del EntitySet en el modelo.
        /// </param>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IQueryable<TEntity> Query(string entitySetName)
        {
            return _ctx.CreateQuery<TEntity>("[" + entitySetName + "]");
        }
        /// <summary>
        /// Un metodo generico que retorna todas las entidades
        /// </summary>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IQueryable<TEntity> Query()
        {
            return _ctx.CreateQuery<TEntity>("[" + GetEntitySetName(_ctx) + "]");
        }

        /// <summary>
        /// </summary>
        /// <param name="entitySetName">
        /// El nombre del EntitySet en el modelo.
        /// </param>
        /// <param name="where"> </param>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IQueryable<TEntity> Query(string entitySetName, ISpecification<TEntity> where)
        {
            return
                _ctx.CreateQuery<TEntity>("[" + entitySetName + "]")
                    .Where(@where.EvalPredicate);
        }

        public IQueryable<TEntity> BuscarTodos(Expression<Func<TEntity, bool>> criterio = null)
        {
            return null != criterio ? Query().Where(criterio) : Query();
            //Set<TEntity>().Where(criterio) : _ctx.Set<TEntity>();
        }

        /// <summary>
        /// </summary>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IQueryable<TEntity> Query(ISpecification<TEntity> where)
        {
            return Query().Where(where.EvalPredicate);
        }
        /// <summary>
        /// Consulta las entidades paginadas
        /// </summary>
        /// <param name="maximumRows">Numero maximo de filas a retornar</param>
        /// <param name="startRowIndex">Indice inicial</param>
        /// <returns>Coleccion de Entities</returns>
        public IQueryable<TEntity> Query(int maximumRows, int startRowIndex)
        {
            return Query().Skip(startRowIndex).Take(maximumRows);
        }


        /// <summary>
        /// Consulta las entidades paginadas
        /// </summary>
        /// <param name="maximumRows">Numero maximo de filas a retornar</param>
        /// <param name="startRowIndex">Indice inicial</param>
        /// <returns>Coleccion de Entities</returns>
        public IQueryable<TEntity> QueryPaged(IQueryable<TEntity> q, int maximumRows, int startRowIndex)
        {
            return q.Skip(startRowIndex).Take(maximumRows);

        }
        /// <summary>
        /// Consulta entidadades paginadas con una direccion y una columan de ordenamiento
        /// </summary>
        /// <param name="q"></param>
        /// <param name="maximumRows"></param>
        /// <param name="startRowIndex"></param>
        /// <param name="sortColumn"></param>
        /// <param name="direction"></param>
        /// <returns></returns>
        public IQueryable<TEntity> QueryPaged(IQueryable<TEntity> q, int maximumRows, int startRowIndex, string sortColumn, string direction)
        {
            try
            {


                var param = Expression.Parameter(typeof(TEntity), "entity");

                var propertyExpression1 = Expression.Property(param, sortColumn);
                IQueryable<TEntity> iQuery;


                if (propertyExpression1.Type == typeof(int))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, int>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);

                }
                else if (propertyExpression1.Type == typeof(int?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, int?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(DateTime?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, DateTime?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(DateTime))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, DateTime>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(decimal?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, decimal?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(decimal))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, decimal>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(Int16?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, Int16?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(Int16))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, Int16>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, object>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }


                return iQuery.Skip(startRowIndex).Take(maximumRows);
                //                
            }
            catch (Exception)
            {
                IQueryable<TEntity> iQuery;
                var param = Expression.Parameter(typeof(TEntity), "entity");
                var idProperty = param.GetType().GetGenericArguments().FirstOrDefault();
                var columnnames = (from t in typeof(TEntity).GetProperties() where t.Name.Contains("ID") select t).FirstOrDefault();

                //var res = SelectByKey("Key");
                var propertyExpression1 = Expression.Property(param, columnnames.Name.ToString());

                var mySortExpression = Expression.Lambda<Func<TEntity, Int32>>(propertyExpression1, param);
                iQuery = q.OrderBy(mySortExpression).Skip(startRowIndex).Take(maximumRows);
                //iQuery = Query(startRowIndex, maximumRows);
                return iQuery;
            }



        }
        /// <summary>
        /// Consulta entidades con una expresion de ordenamiento.
        /// </summary>
        /// <param name="sortExpression">Expresion/Condicion de ordenamiento</param>
        /// <returns>Coleccion de Entities</returns>
        public IQueryable<TEntity> Query(Expression<Func<TEntity, object>> sortExpression)
        {
            if (null == sortExpression)
            {
                return ((IRepository<TEntity>)this).Query();
            }
            return Query().OrderBy(sortExpression);
        }

        /// <summary>
        /// Consulta todas las entidades ordenadas y paginadas
        /// </summary>
        /// <param name="sortExpression">Expresion/Condicion de ordenamiento</param>
        /// <param name="maximumRows">Numero maximo de filas a retornar</param>
        /// <param name="startRowIndex">Indice inicial</param>
        /// <returns>Coleccion de Entities</returns>
        public IQueryable<TEntity> Query(Expression<Func<TEntity, object>>
            sortExpression, int maximumRows, int startRowIndex)
        {
            if (sortExpression == null)
            {
                return ((IRepository<TEntity>)this).Query(maximumRows, startRowIndex);
            }
            return Query(sortExpression).Skip(startRowIndex).Take(maximumRows);
        }

        /// <summary>
        /// Un metodo generico que retorna todas las entidades.
        /// </summary>
        /// <param name="entitySetName">
        /// El nombre del EntitySet.
        /// </param>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect(string entitySetName)
        {
            return Query(entitySetName).ToList();
        }

        /// <summary>
        /// Un metodo generico que retorna todas las entidades.
        /// </summary>
        /// <typeparam name="TEntity">
        /// La entidad a cargarse desde la base de datos.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect()
        {
            return Query().ToList();
        }

        /// <summary>
        /// A generic method to return ALL the entities
        /// </summary>
        /// <param name="entitySetName">
        /// The EntitySet name of the entity in the model.
        /// </param>
        /// <typeparam name="TEntity">
        /// The Entity to load from the database.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect(string entitySetName, ISpecification<TEntity> where)
        {
            return Query(entitySetName, where).ToList();
        }

        /// <summary>
        /// A generic method to return ALL the entities
        /// </summary>
        /// <typeparam name="TEntity">
        /// The Entity to load from the database.
        /// </typeparam>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect(ISpecification<TEntity> where)
        {
            return Query(where).ToList();
        }
        /// <summary>
        /// Select All Entity with Paging 
        /// </summary>
        /// <param name="maximumRows">Max no of row to Fetch</param>
        /// <param name="startRowIndex">Start Index</param>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect(int maximumRows, int startRowIndex)
        {
            return Query(maximumRows, startRowIndex).ToList();
        }
        /// <summary>
        /// Select All Entity in sorted Order
        /// </summary>
        /// <param name="sortExpression">Sort Expression/condition</param>
        /// <returns>Retorna un conjunto de TEntity.</returns>
        public IList<TEntity> DoSelect(Expression<Func<TEntity, object>> sortExpression)
        {
            if (null == sortExpression)
            {
                return Query(sortExpression).ToList();
            }
            return Query(sortExpression).ToList();
        }

        /// <summary>
        /// Select All Entity in sorted Order with Paging support
        /// </summary>
        /// <param name="sortExpression">Sort Expression/condition</param>
        /// <param name="maximumRows">Max no of row to Fetch</param>
        /// <param name="startRowIndex">Start Index</param>
        /// <returns>Collection Of entities</returns>
        public IList<TEntity> DoSelect(Expression<Func<TEntity, object>>
            sortExpression, int maximumRows, int startRowIndex)
        {
            if (sortExpression == null)
            {
                return Query(maximumRows, startRowIndex).ToList();
            }
            return Query(sortExpression, maximumRows, startRowIndex).ToList();
        }
        /// <summary>
        /// Get Entity By Primary Key
        /// </summary>
        /// <typeparam name="E">Entity Type</typeparam>
        /// <param name="key">Primary Key Value</param>
        /// <returns>return entity</returns>
        public TEntity SelectByKey(string key)
        {
            // First we define the parameter that we are going to use the clause. 
            var xParam = Expression.Parameter(typeof(TEntity), typeof(TEntity).Name); //TODO: Maybe it is needed use GetEntitySetName
            MemberExpression leftExpr = Expression.Property(xParam, this._keyProperty);
            Expression rightExpr = Expression.Constant(key);
            BinaryExpression binaryExpr = Expression.Equal(leftExpr, rightExpr);
            //Create Lambda Expression for the selection 
            Expression<Func<TEntity, bool>> lambdaExpr =
            Expression.Lambda<Func<TEntity, bool>>(binaryExpr,
            new ParameterExpression[] { xParam });
            //Searching ....
            IList<TEntity> resultCollection = ((IRepository<TEntity>)this).DoSelect
                        (new Specification<TEntity>(lambdaExpr));
            if (null != resultCollection && resultCollection.Any())
            {
                //return valid single result
                return resultCollection.First<TEntity>();
            }//end if 
            return null;
        }
        /// <summary>
        /// Verifica si el valor de un campo especifico ya existe.
        /// </summary>
        /// <param name="fieldName">Nombre del Field</param>
        /// <param name="fieldValue">Valor del campo</param>
        /// <param name="key">Valor de la llave primaria</param>
        /// <returns>True or False</returns>
        public bool TrySameValueExist(string fieldName, object fieldValue, string key)
        {
            // First we define the parameter that we are going to use the clause. 
            var xParam = Expression.Parameter(typeof(TEntity), typeof(TEntity).Name); //TODO: Maybe it is needed use GetEntitySetName
            MemberExpression leftExprFieldCheck =
            MemberExpression.Property(xParam, fieldName);
            Expression rightExprFieldCheck = Expression.Constant(fieldValue);
            BinaryExpression binaryExprFieldCheck =
            MemberExpression.Equal(leftExprFieldCheck, rightExprFieldCheck);

            MemberExpression leftExprKeyCheck =
            MemberExpression.Property(xParam, this._keyProperty);
            Expression rightExprKeyCheck = Expression.Constant(key);
            BinaryExpression binaryExprKeyCheck =
            MemberExpression.NotEqual(leftExprKeyCheck, rightExprKeyCheck);
            BinaryExpression finalBinaryExpr =
            Expression.And(binaryExprFieldCheck, binaryExprKeyCheck);

            //Create Lambda Expression for the selection 
            Expression<Func<TEntity, bool>> lambdaExpr =
            Expression.Lambda<Func<TEntity, bool>>(finalBinaryExpr,
            new ParameterExpression[] { xParam });
            //Searching ....            
            return ((IRepository<TEntity>)this).TryEntity(new Specification<TEntity>(lambdaExpr));
        }
        /// <summary>
        /// Check if Entities exist with Condition
        /// </summary>
        /// <param name="selectExpression">Selection Condition</param>
        /// <returns>True or False</returns>
        public bool TryEntity(ISpecification<TEntity> selectSpec)
        {
            //return _ctx.CreateQuery<TEntity>("[" + typeof(TEntity).Name + "]").Any<TEntity>
            //            (selectSpec.EvalPredicate);
            return Query().Any(selectSpec.EvalPredicate);
        }
        /// <summary>
        /// Get Count of all records
        /// </summary>
        /// <typeparam name="E"></typeparam>
        /// <returns>count of all records</returns>
        public int GetCount()
        {
            //return _ctx.CreateQuery<TEntity>("[" + typeof(TEntity).Name + "]").Count();
            return Query().Count();
        }
        /// <summary>
        /// Get count of selection
        /// </summary>
        /// <typeparam name="E">Selection Condition</typeparam>
        /// <returns>count of selection</returns>
        public int GetCount(ISpecification<TEntity> selectSpec)
        {
            //return _ctx.CreateQuery<TEntity>("[" + typeof(TEntity).Name + "]")
            //    .Where(selectSpec.EvalPredicate).Count();
            return Query().Where(selectSpec.EvalPredicate).Count();
        }
        /// <summary>
        /// Delete data from context
        /// </summary>
        /// <typeparam name="E"></typeparam>
        /// <param name="entity"></param>
        public void Delete(TEntity entity)
        {
            _ctx.DeleteObject(entity);
        }
        /// <summary>
        /// Delete data from context
        /// </summary>
        /// <typeparam name="E"></typeparam>
        /// <param name="entity"></param>
        public void Delete(object entity)
        {
            _ctx.DeleteObject(entity);
        }
        /// <summary>
        /// Insert new data into context
        /// </summary>
        /// <typeparam name="E"></typeparam>
        /// <param name="entity"></param>
        public void Add(TEntity entity)
        {
            //_ctx.AddObject(entity.GetType().Name, entity);
            _ctx.AddObject(GetEntitySetName(_ctx), entity);
        }
        /// <summary>
        /// Insert if new otherwise attach data into context
        /// </summary>
        /// <param name="entity"></param>
        public void AddOrAttach(TEntity entity)
        {
            // Define an ObjectStateEntry and EntityKey for the current object.
            EntityKey key;
            // Get the detached object's entity key.
            if (entity.EntityKey == null)
            {
                // Get the entity key of the updated object.
                //key = _ctx.CreateEntityKey(entity.GetType().Name, entity);
                key = _ctx.CreateEntityKey(GetEntitySetName(_ctx), entity);
            }
            else
            {
                key = entity.EntityKey;
            }
            try
            {
                // Get the original item based on the entity key from the context
                // or from the database.
                object originalItem;
                if (_ctx.TryGetObjectByKey(key, out originalItem))
                {//accept the changed property
                    if (originalItem is EntityObject &&
                        ((EntityObject)originalItem).EntityState != EntityState.Added)
                    {
                        // Call the ApplyPropertyChanges method to apply changes
                        // from the updated item to the original version.
                        //_ctx.ApplyPropertyChanges(
                        //    key.EntitySetName, entity);
                    }
                }
                else
                {//add the new entity
                    Add(entity);
                }//end else
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Delete all related entries
        /// </summary>
        /// <param name="entity"></param>        
        public void DeleteRelatedEntries(TEntity entity)
        {
            foreach (var relatedEntity in (((IEntityWithRelationships)entity).
        RelationshipManager.GetAllRelatedEnds().SelectMany(re =>
        re.CreateSourceQuery().OfType<EntityObject>()).Distinct()).ToArray())
            {
                _ctx.DeleteObject(relatedEntity);
            }//end foreach
        }

        ///// <summary>
        ///// Delete all related entries
        ///// </summary>
        ///// <param name="entity"></param>        
        //public void DeleteRelatedEntries(E entity, ObservableCollection<string>
        //                    keyListOfIgnoreEntites)
        //{
        //    foreach (var relatedEntity in (((IEntityWithRelationships)entity).
        //    RelationshipManager.GetAllRelatedEnds().SelectMany(re =>
        //    re.CreateSourceQuery().OfType<EntityObject>()).Distinct()).ToArray())
        //    {
        //        PropertyInfo propInfo = relatedEntity.GetType().GetProperty
        //                    (this._KeyProperty);
        //        if (null != propInfo)
        //        {
        //            string value = (string)propInfo.GetValue(relatedEntity, null);
        //            if (!string.IsNullOrEmpty(value) &&
        //                keyListOfIgnoreEntites.Contains(value))
        //            {
        //                continue;
        //            }//end if 
        //        }//end if
        //        _ctx.DeleteObject(relatedEntity);
        //    }//end foreach
        //}

        private string GetEntitySetName(ObjectContext ctx)
        {
            string className = typeof(TEntity).Name;
            var container =
                ctx.MetadataWorkspace.GetEntityContainer(ctx.DefaultContainerName, DataSpace.CSpace);
            string setName = (from meta in container.BaseEntitySets
                              where meta.ElementType.Name == className
                              select meta.Name).First();
            return setName;
        }

        #endregion

        #region IDisposable Members

        public void Dispose()
        {
            if (null != _ctx)
            {
                _ctx.Dispose();
            }
        }

        #endregion

    }
}
