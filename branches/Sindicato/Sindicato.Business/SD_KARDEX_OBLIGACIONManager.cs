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
    public class SD_KARDEX_OBLIGACIONManager : Repository<SD_KARDEX_OBLIGACION>
    {


        public SD_KARDEX_OBLIGACIONManager(IUnitOfWork uow) : base(uow) { }

        //test
        
    }
}
