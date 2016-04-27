using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_REGULARIZACIONESManager : Repository<SD_REGULARIZACIONES>
    {


        public SD_REGULARIZACIONESManager(IUnitOfWork uow) : base(uow) { }


        
    }
}
